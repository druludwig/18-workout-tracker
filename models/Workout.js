const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutEventSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true
            },
            name: {
                type: String,
                trim: true,
            },
            sets: Number,
            duration: Number,
            reps: Number,
            weight: Number,
            distance: Number,
        }],
    totalDuration: Number,
});

const WorkoutEvent = mongoose.model("WorkoutEvent", WorkoutEventSchema);
module.exports = WorkoutEvent;