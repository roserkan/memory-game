const router = require('express').Router();
const GameImageService = require('../business/services/gameImageService');
const gameImageService = new GameImageService();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const upload = uploadMiddleware('uploads/images/gameImages');


router.get('/getall', async (req, res) => {
    const result = await gameImageService.getAll();
    res.json(result);
});

router.get('/getbyid/:id', async (req, res) => {
    const result = await gameImageService.getById(req.params.id);
    res.json(result);
});

router.get('/getbytypeid/:id', async (req, res) => {
    const result = await gameImageService.getByTypeId(req.params.id);
    res.json(result);
});

router.post('/add', upload.array('image'), async (req, res, next) => {
    const gameTypeId = req.body.gameTypeId;
    req.files.forEach(async item => {
        const imagePath = req.file.path.replace('uploads\\', '')
        const data = { gameTypeId: gameTypeId, imagePath: imagePath }
        const result = await gameImageService.add(data)
        if (result.status === 400) res.json({ data: [], message: 'Error', status: 400 })
    });
    res.json({ data: [], message: 'Success', status: 200 })

});

router.delete('/delete/:id', async (req, res) => {
    const result = await gameImageService.delete(req.params.id);
    res.json(result);
});

router.post('/update/:id', upload.single('image'), async (req, res) => {
    const imagePath = req.file.path.replace('uploads/', '')
    const data = { imagePath: imagePath }
    console.log(req.params.id);
    console.log(data)
    const result = await gameImageService.update(req.params.id, data)
    res.json(result);
});



module.exports = router;