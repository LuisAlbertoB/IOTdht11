module.exports = (app) => {
    const sensorDataController = require("../controllers/sensorData.controller.js");
  
    // Rutas para los datos del sensor
    app.post("/api/sensor-data", sensorDataController.createSensorData);
    app.get("/api/sensor-data", sensorDataController.getAllSensorData);
    app.delete("/api/sensor-data", sensorDataController.clearSensorData);
  
    // Rutas para obtener los datos de las tablas adicionales
    const temperatureHighController = require("../controllers/temperatureHigh.controller.js");
    const temperatureLowController = require("../controllers/temperatureLow.controller.js");
    const humidityHighController = require("../controllers/humidityHigh.controller.js");
    const humidityLowController = require("../controllers/humidityLow.controller.js");
  
    // Rutas para la asociación de datos
    app.post("/api/temperature-high/associate", temperatureHighController.associateHighTemperatures);
    app.post("/api/temperature-low/associate", temperatureLowController.associateLowTemperatures);
    app.post("/api/humidity-high/associate", humidityHighController.associateHighHumidity);
    app.post("/api/humidity-low/associate", humidityLowController.associateLowHumidity);
};
