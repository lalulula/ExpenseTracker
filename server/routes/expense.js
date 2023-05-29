const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Transaction = require("../model/Transaction");
const passport = require("passport");

router.get("/", (req, res) => {
  console.log("expense route running");
});

// router.get(
//   "/getTransactions",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     console.log("getting transaction of", req.user, req.user._id);
//     const transactions = await Transaction.find({ userId: req.user._id }).sort({
//       createdAt: -1,
//     });
//     //find with an empth body means that it will be looking for everything
//     res.send(transactions);
//   }
// );
router.post(
  "/createTransaction",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.user);
    const { details, amount, date } = req.body; //Always remember to destructure the request body or to get it by req.body in the params
    const transaction = new Transaction({
      details,
      amount,
      date,
      user: req.user._id,
      category_id: req.body.category_id,
    });
    await transaction.save();
    res.send({ message: "Successfully saved on DB" });
  }
);
router.get(
  "/getTransactions",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log("getting transaction of", req.user, req.user._id);
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    //find with an empth body means that it will be looking for everything
    res.send(transactions);
  }
);
router.get(
  "/getGroupedTransactions",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log("getting transaction of", req.user, req.user._id);
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    const test = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { $month: "$date" },
          transactions: {
            $push: {
              amount: "$amount",
              details: "$details",
              date: "$date",
            },
          },
          totalExpenses: { $sum: "$amount" },
        },
      },
    ]);
    //find with an empth body means that it will be looking for everything
    res.send(test);
  }
);

router.put(
  "/updateTransaction/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updatedData = req.body;
    await Transaction.updateOne({ _id: req.params.id }, { $set: updatedData });
    res.json({ message: "Successfully updated on DB" });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const _id = req.params.id;
    await Transaction.findOneAndDelete({ _id: _id });
    res.json({ message: "Successfully deleted from DB" });
  }
);
module.exports = router;
