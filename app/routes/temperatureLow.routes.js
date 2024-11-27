module.exports = (app) => {
    const temperatureLowController = require("../controllers/temperatureLow.controller.js");

    app.post("/api/temperature-low/associate", temperatureLowController.associateLowTemperature);
    app.get("/api/temperature-low", temperatureLowController.getRecentTemperatureLow);
};
