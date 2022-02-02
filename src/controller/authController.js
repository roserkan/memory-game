const router = require('express').Router();
const AuthService = require('../business/services/authService');
const authService = new AuthService();



router.post('/login', async (req, res) => {
    const result = await authService.login(req.body);
    res.json(result);
});




module.exports = router;