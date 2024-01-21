const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/payment/verify', async (req, res) => {
    try {
        const { token, amount } = req.body;

        const config = {
            headers: {
                'Authorization': 'Key test_secret_key_f59e8b7d18b4499ca40f68195a846e9b'
            }
        };

        const response = await axios.post("https://khalti.com/api/v2/payment/verify/", { token, amount }, config);

        console.log(response.data);

        res.json({
            status: true,
            message: 'Payment verification successful!',
            data: response.data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Error verifying payment.',
            error: error.message,
        });
    }
});

module.exports = router;
