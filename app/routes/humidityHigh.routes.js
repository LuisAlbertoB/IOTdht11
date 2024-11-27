module.exports = (app) => {
    const humidityHighController = require("../controllers/humidityHigh.controller");

    app.post("/api/humidity-high/associate", humidityHighController.associateHighHumidity);
    app.get("/api/humidity-high/recent", humidityHighController.getRecentHumidityHigh);
};
