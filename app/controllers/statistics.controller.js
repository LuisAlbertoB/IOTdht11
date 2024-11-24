const db = require("../models");
const SensorData = db.sensorData;

// Calcular el promedio de humedad
exports.getAverageHumidity = async (req, res) => {
  try {
    const result = await SensorData.findAll({
      attributes: [[db.Sequelize.fn("AVG", db.Sequelize.col("humidity")), "averageHumidity"]],
    });

    const averageHumidity = result[0].dataValues.averageHumidity;

    res.status(200).send({ averageHumidity });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al calcular el promedio de humedad" });
  }
};

// Calcular el promedio de temperatura
exports.getAverageTemperature = async (req, res) => {
  try {
    const result = await SensorData.findAll({
      attributes: [[db.Sequelize.fn("AVG", db.Sequelize.col("temperature")), "averageTemperature"]],
    });

    const averageTemperature = result[0].dataValues.averageTemperature;

    res.status(200).send({ averageTemperature });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al calcular el promedio de temperatura" });
  }
};

// Calcular la mediana de humedad
exports.getMedianHumidity = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ["humidity"],
      order: [["humidity", "ASC"]],
    });

    const humidityValues = data.map((item) => item.humidity);
    const median = calculateMedian(humidityValues);

    res.status(200).send({ medianHumidity: median });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al calcular la mediana de humedad" });
  }
};

// Calcular la mediana de temperatura
exports.getMedianTemperature = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ["temperature"],
      order: [["temperature", "ASC"]],
    });

    const temperatureValues = data.map((item) => item.temperature);
    const median = calculateMedian(temperatureValues);

    res.status(200).send({ medianTemperature: median });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al calcular la mediana de temperatura" });
  }
};

// Calcular la desviación estándar de humedad
exports.getStandardDeviationHumidity = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ["humidity"],
    });

    const humidityValues = data.map((item) => item.humidity);
    const stdDev = calculateStandardDeviation(humidityValues);

    res.status(200).send({ standardDeviationHumidity: stdDev });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al calcular la desviación estándar de humedad" });
  }
};

// Calcular la desviación estándar de temperatura
exports.getStandardDeviationTemperature = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ["temperature"],
    });

    const temperatureValues = data.map((item) => item.temperature);
    const stdDev = calculateStandardDeviation(temperatureValues);

    res.status(200).send({ standardDeviationTemperature: stdDev });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al calcular la desviación estándar de temperatura" });
  }
};

// Función para calcular la mediana
function calculateMedian(values) {
  const sortedValues = values.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
  }

  return sortedValues[middleIndex];
}

// Función para calcular la desviación estándar
function calculateStandardDeviation(values) {
  const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
  const variance = values.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}
