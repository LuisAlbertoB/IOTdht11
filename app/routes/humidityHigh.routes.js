module.exports = (app) => {
    const humidityHighController = require("../controllers/humidityHigh.controller.js");

    app.post("/api/humidity-high/associate", humidityHighController.associateHighHumidity);
    app.get("/api/humidity-high", humidityHighController.getHighHumidityRecords);
};