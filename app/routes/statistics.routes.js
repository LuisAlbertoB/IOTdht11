module.exports = (app) => {
    const statisticsController = require("../controllers/statistics.controller.js");
  
    // Ruta para obtener el promedio de humedad
    app.get("/api/statistics/average-humidity", statisticsController.getAverageHumidity);
  
    // Ruta para obtener el promedio de temperatura
    app.get("/api/statistics/average-temperature", statisticsController.getAverageTemperature);
  
    // Ruta para obtener la mediana de humedad
    app.get("/api/statistics/median-humidity", statisticsController.getMedianHumidity);
  
    // Ruta para obtener la mediana de temperatura
    app.get("/api/statistics/median-temperature", statisticsController.getMedianTemperature);
  
    // Ruta para obtener la desviación estándar de humedad
    app.get("/api/statistics/standard-deviation-humidity", statisticsController.getStandardDeviationHumidity);
  
    // Ruta para obtener la desviación estándar de temperatura
    app.get("/api/statistics/standard-deviation-temperature", statisticsController.getStandardDeviationTemperature);
  };
  