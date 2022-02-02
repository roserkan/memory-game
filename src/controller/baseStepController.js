const router = require('express').Router();
const BaseStepService = require('../business/services/baseStepService');
const baseStepService = new BaseStepService();



router.get('/getall', async (req, res) => {
    const result = await baseStepService.getAll();
    res.json(result);
});

router.get('/getbyid/:id', async (req, res) => {
    const result = await baseStepService.getById(req.params.id);
    res.json(result);
});

router.post('/add', async (req, res, next) => {
    const result = await baseStepService.add(req.body);
    res.json(result);
});

router.delete('/delete/:id', async (req, res) => {
    const result = await baseStepService.delete(req.params.id);
    res.json(result);
});

router.post('/update/:id', async (req, res) => {
    console.log(req.body);
    const result = await baseStepService.update(req.params.id, req.body);
    res.json(result);
});



module.exports = router;