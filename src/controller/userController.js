const router = require('express').Router();
const UserService = require('../business/services/userService');
const userService = new UserService();



router.get('/getall', async (req, res) => {
    const result = await userService.getAll();
    res.json(result);
});

router.get('/getbyid/:id', async (req, res) => {
    const result = await userService.getById(req.params.id);
    res.json(result);
});

router.post('/add', async (req, res, next) => {
    const result = await userService.add(req.body);
    res.json(result);
});

router.delete('/delete/:id', async (req, res) => {
    const result = await userService.delete(req.params.id);
    res.json(result);
});

router.post('/update/:id', async (req, res) => {
    const result = await userService.update(req.params.id, req.body);
    res.json(result);
});



module.exports = router;