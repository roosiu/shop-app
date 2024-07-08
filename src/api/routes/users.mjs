const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//wyciągam router z express
const router = express.Router();

//importuję model użytkownika
const User = require('../models/user.cjs');

//zakładanie konta
router.post('/signup', (req, res, next) => {
  //sprawdzenie czy już przypadkiem nie istnieje taki username
  User.findOne({ username: req.body.username }).then((user) => {
    if (user)
      return res
        .status(409)
        .json({ message: 'Użytkownik o danej nazwie już istnieje' });
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });
        else {
          const user = new User({
            username: req.body.username,
            password: hash,
          });
          user.save().then((result) => {
            res.status(201).json({ message: 'Dodano nowego usera' });
          });
        }
      });
    }
  });
});

// logowanie
router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) return res.status(401).json({ message: 'Błąd autoryzacji' });
    //gdy użytkownik istnieje to zweryfikuj hasło
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(401).json({ message: 'Błąd autoryzacji' });
      if (!result) return res.status(401).json({ message: 'Błąd autoryzacji' });
      else {
        //generujemy JWT
        const token = jwt.sign(
          { username: user.username },
          process.env.SECRET_KEY,
          {
            expiresIn: '1d',
          }
        );
        return res.status(200).json({ token });
      }
    });
  });
});

module.exports = router;
