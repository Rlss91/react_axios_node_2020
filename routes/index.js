var express = require("express");
var router = express.Router();
const jwt = require("../auth/jwt");

const authGuardMW = (req, res, next) => {
  jwt
    .verifyToken(req.headers.token)
    .then((ok) => {
      next();
    })
    .catch((err) => {
      console.log(err);
      res.json({ err: "something went wrong" });
    });
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ msg: "ok" });
});

router.get("/error", function (req, res, next) {
  console.log(req.query);
  res.status(201).json({ msg: "ok" });
});

router.get("/:id", authGuardMW, function (req, res, next) {
  res.json({ msg: "ok", id: req.params.id });
});

router.post("/", (req, res) => {
  console.log(req.headers);
  res.json(req.body);
});

router.post("/login", (req, res) => {
  const db = [
    {
      us: "james",
      ps: "123",
    },
    {
      us: "kenny",
      ps: "123",
    },
  ];
  let findUser = false;
  for (let user of db) {
    if (user.us === req.body.us) {
      if (user.ps === req.body.ps) {
        findUser = true;
        break;
      }
    }
  }
  if (findUser) {
    jwt
      .generateToken({ data: "aieuwjrhgoiuerhg" })
      .then((token) => {
        res.json({ token: token });
      })
      .catch((err) => {
        res.json({ err: "failed to gen token" });
      });
  } else {
    res.json({ err: "user or pass incorrect" });
  }
});

module.exports = router;
