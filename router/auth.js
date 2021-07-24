const express = require('express');

//step 1 create router
const router = express.Router();
const mongoose = require("mongoose");
//const user = require("User")
const User = require('../model/userSchema');

//step 2 replace app to router
router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

//singl user add
router.post('/register', async (req, res) => {
    try {
        const registerUser = new User(
            req.body
        );
        const userSaved = await registerUser.save();
        res.status(201).send(userSaved);

    } catch (err) {
        res.status(400).send(err);
    }
    // console.log(req.body);
    // res.json({ message: req.body });
    // User = res.body;
    // console.log(User)




    // res.send("mera register page");
});

//all user find or search
// router.get('/register', async (req, res) => {
//     try {
//         const getUsers = await User.find({});

//         res.send(getUsers);

//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

//sort by ranking

router.get('/register', async (req, res) => {
    try {
        const getUsers = await User.find({}).sort({ "ranking": 1 });

        res.send(getUsers);

    } catch (err) {
        res.status(500).send(err);
    }
});
//single user find or search
router.get('/register/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await User.findById(_id);

        res.send(getUser);

    } catch (err) {
        res.status(500).send(err);
    }
});

//single user patch req 

router.patch('/register/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await User.findByIdAndUpdate(_id, req.body,
            {
                new: true
            }

        );

        res.send(getUser);

    } catch (err) {
        res.status(500).send(err);
    }
});


//delete req for individual
router.delete('/register/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await User.findByIdAndDelete(_id,
        );

        res.send(getUser);

    } catch (err) {
        res.status(500).send(err);
    }
});


router.get('/users', paginatedResults(User), (req, res) => {
    res.json(res.paginatedResults)
  })
  
  function paginatedResults(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}
  
      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }
//step 3 export router
module.exports = router;