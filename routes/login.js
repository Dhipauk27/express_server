var express = require('express');
var Users = require('../models/Users');
var _ = require('lodash')

var router = express.Router();

router.post("/", async(req,res)=>{
  console.log('inside login route');

  try {
    var emailId = req.body.data.email_id;
    var password = req.body.data.password;
    //console.log(emailId, password);

    var user = await Users.findOne({
      email_address: emailId,
      password: password
    })
    .catch(error => {
      console.log(error)
    });

    if(_.isEmpty(user)) {
      res.status(400).send({ message: "user not available"})
    } else {
      res.status(200).send({ user })
    }
  } catch (error) {
    console.log('in catch', error);
    res.status(400).send({ message: "error on login"})
  }
})

module.exports = router;