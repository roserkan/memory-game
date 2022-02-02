const router = require('express').Router();
const GameTypeService = require('../business/services/gameTypeService');
const gameTypeService = new GameTypeService();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const upload = uploadMiddleware('uploads/images/typeImages');


router.get('/getall', async (req, res) => {
    const result = await gameTypeService.getAll();
    res.json(result);
});

router.get('/getbyid/:id', async (req, res) => {
    const result = await gameTypeService.getById(req.params.id);
    res.json(result);
});

router.post('/add', upload.single('image'), async (req, res, next) => {
    const gameType = req.body.gameType;
    const imagePath = req.file.path.replace('uploads\\', '')
    const data = {gameType, imagePath};
    const result = await gameTypeService.add(data);
    res.json(result)
});

router.delete('/delete/:id', async (req, res) => {
    const result = await gameTypeService.delete(req.params.id);
    res.json(result);
});

router.post('/update/:id', upload.single('image'),  async (req, res, next) => {
    let data = {};
    data.gameType = req.body.gameType;
    if(req.file) data.imagePath = req.file.path.replace('uploads/', '')
    const result = await gameTypeService.update(req.params.id, data);
    res.json(result)
});



module.exports = router;