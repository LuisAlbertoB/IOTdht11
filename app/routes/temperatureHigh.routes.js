module.exports = (app) => {
    const temperatureHighController = require("../controllers/temperatureHigh.controller.js");

    app.post("/api/temperature-high/associate", temperatureHighController.associateHighTemperatures);
    app.get("/api/temperature-high", temperatureHighController.getAllTemperatureHigh);
};
