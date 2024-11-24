const db = require("../models");
const SensorData = db.sensorData;

// Función para calcular la probabilidad de descomposición
const calculateDecompositionProbability = (temperature, humidity, temperatureThreshold = 30, humidityThreshold = 80) => {
  const isTemperatureHigh = temperature > temperatureThreshold;
  const isHumidityHigh = humidity > humidityThreshold;

  if (isTemperatureHigh && isHumidityHigh) {
    return 1.0;  // 100% de probabilidad
  }

  if (isTemperatureHigh || isHumidityHigh) {
    return 0.5;  // 50% de probabilidad
  }

  return 0.1;  // 10% de probabilidad
};

// Calcular la probabilidad de descomposición del pan
exports.getDecompositionProbability = async (req, res) => {
  try {
    // Consultamos los datos de la tabla `sensorData`
    const result = await SensorData.findAll({
      attributes: [
        [db.Sequelize.fn("AVG", db.Sequelize.col("temperature")), "averageTemperature"],
        [db.Sequelize.fn("AVG", db.Sequelize.col("humidity")), "averageHumidity"]
      ]
    });

    const averageTemperature = result[0].dataValues.averageTemperature;
    const averageHumidity = result[0].dataValues.averageHumidity;

    // Calculamos la probabilidad de descomposición
    const probability = calculateDecompositionProbability(averageTemperature, averageHumidity);

    res.status(200).send({
      averageTemperature,
      averageHumidity,
      probabilityOfDecomposition: probability,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error al calcular la probabilidad de descomposición del pan"
    });
  }
};
