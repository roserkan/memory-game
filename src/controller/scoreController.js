const router = require('express').Router();
const ScoreService = require('../business/services/scoreService');
const scoreService = new ScoreService();



router.get('/getall', async (req, res) => {
    const result = await scoreService.getAll();
    res.json(result);
});

router.get('/getbyid/:id', async (req, res) => {
    const result = await scoreService.getById(req.params.id);
    res.json(result);
});

router.post('/add', async (req, res, next) => {
    const result = await scoreService.add(req.body);
    res.json(result);
});

router.delete('/delete/:id', async (req, res) => {
    const result = await scoreService.delete(req.params.id);
    res.json(result);
});

router.post('/update/:id', async (req, res) => {
    const result = await scoreService.update(req.params.id, req.body);
    res.json(result);
});

router.post('/updatebyuserid/:id', async (req, res) => {
    const result = await scoreService.updateByUserId(req.params.id, req.body);
    res.json(result);
});



module.exports = router;