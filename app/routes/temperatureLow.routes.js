module.exports = (app) => {
    const temperatureLowController = require("../controllers/temperatureLow.controller.js");

    app.post("/api/temperature-low/associate", temperatureLowController.associateLowTemperatures);
    app.get("/api/temperature-low", temperatureLowController.getAllTemperatureLow);
};
