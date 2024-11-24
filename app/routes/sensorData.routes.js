module.exports = (app) => {
    const sensorDataController = require("../controllers/sensorData.controller.js");

    app.post("/api/sensor-data", sensorDataController.createSensorData);
    app.get("/api/sensor-data", sensorDataController.getAllSensorData);
    app.delete("/api/sensor-data", sensorDataController.clearSensorData);
};
