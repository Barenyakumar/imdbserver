const express = require("express");
const cors = require("cors");
const { actorAPI, producerAPI, movieAPI } = require("./api");

module.exports = async (app) => {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    actorAPI(app);
    producerAPI(app);
    movieAPI(app);

}