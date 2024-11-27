module.exports = (app) => {
    const sensorDataController = require("../controllers/sensorData.controller.js");
  
    // Crear un nuevo dato de sensor
    app.post("/api/sensor-data", sensorDataController.createSensorData);
  
    // Obtener todos los datos del sensor
    app.get("/api/sensor-data", sensorDataController.getAllSensorData);
  
    // Vaciar la tabla (solo para administradores)
    app.delete("/api/sensor-data", sensorDataController.clearSensorData);
  
    // Obtener los últimos 20 registros de datos del sensor
    app.get("/api/sensor-data/recent", sensorDataController.getRecentSensorData); // Nuevo endpoint
  };
  