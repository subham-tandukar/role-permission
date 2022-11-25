const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/", (req, res) => {
//   console.log("connect");
// });

// add user
router.post("/addUser", async (req, res) => {
  // console.log(req.body);
  const { name, email, number, address } = req.body;

  if (!name || !email || !number || !address) {
    res.status(422).json("Please fill the data");
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json({
        message: "This email is already used",
      });
    } else {
      const adduser = new users({
        name,
        email,
        number,
        address,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// get user
router.get("/getData", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log("userdata", userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get individual user
router.get("/getUser/:id", async (req, res) => {
  try {
    console.log("userdata", req.params);
    const { id } = req.params;

    const userIndividual = await users.findById({ _id: id });
    console.log("userIndividual", userIndividual);
    res.status(201).json(userIndividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user
router.patch("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log("updated User", updatedUser);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await users.findByIdAndDelete({ _id: id });

    console.log("updated User", deleteUser);
    res.status(201).json(deleteUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
