const router = require("express").Router();
const UserService = require("../business/services/userService");
const userService = new UserService();

const ScoreService = require("../business/services/scoreService");
const scoreService = new ScoreService();

const sum = arr => {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
}

router.get("/getall", async (req, res) => {
  const users = await userService.getAll();
  const scores = await scoreService.getAll();

    const datas = []

  users.data.forEach((user) => {
    if (user.claim === "user") {
      const userScores = scores.data.filter(
        (scores) => scores.userId === user._id.toString()
      )[0].scores;

      const normalValues = Object.values(userScores["Normal"]);
      const clickValues = Object.values(userScores["Sınırlı Tıklama"]);
      const timeValues = Object.values(userScores["Zamana Karşı"]);

      let point = sum(normalValues) + sum(clickValues) + sum(timeValues)
      
      let data = {
          username: user.username,
          point: point
      };

      datas.push(data);
    
    }
  });

  res.send(datas);
});

module.exports = router;
