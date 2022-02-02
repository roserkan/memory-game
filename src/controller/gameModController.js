const router = require('express').Router();
const GameModService = require('../business/services/gameModService');
const gameModService = new GameModService();



router.get('/getall', async (req, res) => {
    const result = await gameModService.getAll();
    res.json(result);
});

router.get('/getbyid/:id', async (req, res) => {
    const result = await gameModService.getById(req.params.id);
    res.json(result);
});

router.post('/add', async (req, res, next) => {
    const result = await gameModService.add(req.body);
    res.json(result);
});

router.delete('/delete/:id', async (req, res) => {
    const result = await gameModService.delete(req.params.id);
    res.json(result);
});

router.post('/update/:id', async (req, res) => {
    const result = await gameModService.update(req.params.id, req.body);
    res.json(result);
});



module.exports = router;