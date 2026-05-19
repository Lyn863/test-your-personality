const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory storage (for Railway ephemeral storage, consider using a database for production)
let testResults = [];
let adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
let nextId = 1;

// API Routes

// Save test result
app.post('/api/test-result', (req, res) => {
    const result = {
        id: nextId++,
        timestamp: req.body.timestamp || new Date().toISOString(),
        scores: req.body.scores,
        personality_type: req.body.personalityType,
        test_duration: req.body.testDuration,
        userInfo: req.body.userInfo || {}
    };
    
    testResults.push(result);
    console.log('New test result saved:', result.id);
    
    res.json({ success: true, id: result.id });
});

// Get all results (admin)
app.post('/api/test-results', (req, res) => {
    if (req.body.password !== adminPassword) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    
    res.json({ success: true, results: testResults });
});

// Verify password
app.post('/api/verify-password', (req, res) => {
    const isValid = req.body.password === adminPassword;
    res.json({ success: isValid });
});

// Get stats
app.get('/api/stats', (req, res) => {
    const totalTests = testResults.length;
    
    // Calculate type distribution
    const typeDistribution = {};
    testResults.forEach(result => {
        const type = result.personality_type;
        typeDistribution[type] = (typeDistribution[type] || 0) + 1;
    });
    
    const typeDistributionArray = Object.entries(typeDistribution).map(([personality_type, count]) => ({
        personality_type,
        count
    }));
    
    // Calculate dimension averages
    const dimensionTotals = { E: 0, O: 0, A: 0, C: 0, N: 0 };
    let validScoreCount = 0;
    
    testResults.forEach(result => {
        if (result.scores) {
            Object.keys(dimensionTotals).forEach(dim => {
                dimensionTotals[dim] += result.scores[dim] || 0;
            });
            validScoreCount++;
        }
    });
    
    const dimensionAverages = {};
    if (validScoreCount > 0) {
        Object.keys(dimensionTotals).forEach(dim => {
            dimensionAverages[dim] = dimensionTotals[dim] / validScoreCount;
        });
    }
    
    res.json({
        totalTests,
        typeDistribution: typeDistributionArray,
        dimensionAverages
    });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
