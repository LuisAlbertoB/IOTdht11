module.exports = (app) => {
    const temperatureHighController = require("../controllers/temperatureHigh.controller.js");

    app.post("/api/temperature-high/associate", temperatureHighController.associateHighTemperature);
    app.get("/api/temperature-high", temperatureHighController.getRecentTemperatureHigh);
};
