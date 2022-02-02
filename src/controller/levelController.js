const router = require('express').Router();
const LevelService = require('../business/services/levelService');
const levelService = new LevelService();



router.get('/getall', async (req, res) => {
    const result = await levelService.getAll();
    res.json(result);
});

router.get('/getbyid/:id', async (req, res) => {
    const result = await levelService.getById(req.params.id);
    res.json(result);
});

router.get('/getbyuserid/:id', async (req, res) => {
    const result = await levelService.getByUserId(req.params.id);
    res.json(result);
});

router.post('/add', async (req, res, next) => {
    const result = await levelService.add(req.body);
    res.json(result);
});

router.delete('/delete/:id', async (req, res) => {
    const result = await levelService.delete(req.params.id);
    res.json(result);
});

router.post('/update/:id', async (req, res) => {
    const result = await levelService.update(req.params.id, req.body);
    res.json(result);
});


router.post('/updatebyuserid/:id', async (req, res) => {
    const result = await levelService.updateByUserId(req.params.id, req.body);
    res.json(result);
});







module.exports = router;