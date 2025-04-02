const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    yearOfRelease: {
        type: Number,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    poster: {
        type: String
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producer",
        required : true,
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
    }],
});

module.exports = mongoose.model("Movie", movieSchema);