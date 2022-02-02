const baseStepRouter = require('../controller/baseStepController');
const gameImageRouter = require('../controller/gameImageController');
const gameModRouter = require('../controller/gameModController');
const gameTypeRouter = require('../controller/gameTypeController');
const levelRouter = require('../controller/levelController');
const scoreRouter = require('../controller/scoreController');
const userRouter = require('../controller/userController');
const authRouter = require('../controller/authController');
const bestPlayerRouter = require('../controller/bestPlayerController');




function routerMiddleware(app, req, res){
    app.use('/api/baseSteps', baseStepRouter);
    app.use('/api/gameImages', gameImageRouter);
    app.use('/api/gameModes', gameModRouter);
    app.use('/api/gameTypes', gameTypeRouter);
    app.use('/api/levels', levelRouter);
    app.use('/api/scores', scoreRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/bestPlayers', bestPlayerRouter);
   
}

module.exports = routerMiddleware;