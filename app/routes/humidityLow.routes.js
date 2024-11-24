module.exports = (app) => {
    const humidityLowController = require("../controllers/humidityLow.controller.js");

    app.post("/api/humidity-low/associate", humidityLowController.associateLowHumidity);
    app.get("/api/humidity-low", humidityLowController.getLowHumidityAssociations);
};
