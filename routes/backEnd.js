const express = require('express');
const router = express.Router();
const db = require('../models');

//Get ALL Workout Events
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } }])
    .then((WorkoutEvent) => {
      res.json(WorkoutEvent);
    }).catch(err => {
      res.json(err);
    });
});


//Create NEW Workout
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body).then((WorkoutEvent => {
    res.json(WorkoutEvent);
  })).catch(err => {
    res.json(err);
  });
});

// Get a RANGE of Workouts
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([{ $addFields: { totalDuration: { $sum: "$exercises.duration" } } }])
    .sort({ _id: -1 }).limit(7)
    .then(WorkoutEvent => {
      res.json(WorkoutEvent);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Add NEW Type of Exercise
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate({ new: true }, { _id: req.params.id }, { $push: { exercises: req.body } })
    .then(WorkoutEvent => {
      res.json(WorkoutEvent);
    }).catch(err => {
      res.json(err);
    });
});
module.exports = router