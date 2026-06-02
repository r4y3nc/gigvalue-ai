const axios = require('axios');

const healthCheck = async (req, res) => {
    let dlStatus = 'unavailable';

    try {
        await axios.get(`${process.env.DLSERVICE_URL}/health`);
        dlStatus = 'available';
    } catch {
        dlStatus = 'unavailable';
    }

    res.json({
        success: true,
        data: {
            server: 'available',
            dlService: dlStatus,
            timestamp: new Date().toISOString(),
        },
    });
};

module.exports = { healthCheck };