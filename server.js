const express = require('express');
const initSqlJs = require('sql.js');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const DB_PATH = path.join(__dirname, 'test_results.db');

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

let db;

// 初始化数据库
async function initDatabase() {
  const SQL = await initSqlJs();

  // 如果数据库文件存在则加载，否则创建新数据库
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // 创建表
  db.run(`
    CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      scores TEXT NOT NULL,
      personality_type TEXT NOT NULL,
      test_duration REAL,
      user_info TEXT
    )
  `);

  saveDatabase();
  console.log('数据库初始化完成');
}

// 保存数据库到文件
function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

// 查询辅助函数
function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function queryOne(sql, params = []) {
  const results = queryAll(sql, params);
  return results.length > 0 ? results[0] : null;
}

// 保存测试结果
app.post('/api/test-result', (req, res) => {
  try {
    const { timestamp, scores, personalityType, testDuration, userInfo } = req.body;

    db.run(`
      INSERT INTO test_results (timestamp, scores, personality_type, test_duration, user_info)
      VALUES (?, ?, ?, ?, ?)
    `, [timestamp, JSON.stringify(scores), personalityType, testDuration, JSON.stringify(userInfo)]);

    // 获取刚插入的 ID
    const lastId = queryOne('SELECT last_insert_rowid() as id');
    saveDatabase();

    res.json({ success: true, id: lastId ? lastId.id : null });
  } catch (error) {
    console.error('保存测试结果失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取统计数据
app.get('/api/stats', (req, res) => {
  try {
    const totalResult = queryOne('SELECT COUNT(*) as count FROM test_results');
    const totalTests = totalResult ? totalResult.count : 0;

    // 人格类型分布
    const typeDistribution = queryAll(`
      SELECT personality_type, COUNT(*) as count
      FROM test_results
      GROUP BY personality_type
    `);

    // 维度平均分
    const allResults = queryAll('SELECT scores FROM test_results');
    const dimensionTotals = { E: 0, O: 0, A: 0, C: 0, N: 0 };
    let validCount = 0;

    allResults.forEach(row => {
      const scores = JSON.parse(row.scores);
      if (scores.E !== undefined) {
        Object.keys(dimensionTotals).forEach(dim => {
          dimensionTotals[dim] += scores[dim] || 0;
        });
        validCount++;
      }
    });

    const dimensionAverages = {};
    Object.keys(dimensionTotals).forEach(dim => {
      dimensionAverages[dim] = validCount > 0
        ? Math.round((dimensionTotals[dim] / validCount) * 10) / 10
        : 0;
    });

    res.json({ totalTests, typeDistribution, dimensionAverages });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 验证管理密码
app.post('/api/verify-password', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: '密码错误' });
  }
});

// 获取所有测试结果（需要密码）
app.post('/api/test-results', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: '密码错误' });
  }

  try {
    const results = queryAll('SELECT * FROM test_results ORDER BY id DESC');
    const parsed = results.map(row => ({
      ...row,
      scores: JSON.parse(row.scores),
      userInfo: row.user_info ? JSON.parse(row.user_info) : null
    }));

    res.json({ success: true, results: parsed });
  } catch (error) {
    console.error('获取测试结果失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 路由：管理后台
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// 启动服务器
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`服务器已启动: http://localhost:${PORT}`);
    console.log(`管理后台: http://localhost:${PORT}/admin`);
    console.log(`管理密码: ${ADMIN_PASSWORD}`);
  });
}).catch(err => {
  console.error('数据库初始化失败:', err);
  process.exit(1);
});
