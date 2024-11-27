const db = require("../models");
const HumidityLow = db.humidityLow;
const SensorData = db.sensorData;
const { Op } = require("sequelize");

// Asociar registros de humedad baja a la tabla HumidityLow
exports.associateLowHumidity = async (req, res) => {
  try {
    const lowHumidityThreshold = 30; // Umbral de humedad baja

    // Buscar registros con humedad baja
    const lowHumidityData = await SensorData.findAll({
      where: {
        humidity: {
          [Op.lt]: lowHumidityThreshold
        }
      }
    });

    // Asociar a HumidityLow
    for (let data of lowHumidityData) {
      const existingAssociation = await HumidityLow.findOne({
        where: { sensorDataId: data.id }
      });

      if (!existingAssociation) {
        await HumidityLow.create({
          sensorDataId: data.id
        });
      }
    }

    res.status(200).send({ message: "Asociación de humedad baja completada." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al asociar humedad baja." });
  }
};

// Obtener las últimas 20 asociaciones de humedad baja
exports.getLowHumidityAssociations = async (req, res) => {
  try {
    // Obtener las últimas 20 asociaciones de humedad baja
    const associations = await HumidityLow.findAll({
      include: {
        model: SensorData,
        as: "sensor_datum", // Asegúrate de que el alias coincida con tu asociación en el modelo
        attributes: ['id', 'humidity', 'temperature', 'timestamp'] // Los campos que deseas obtener
      },
      order: [['createdAt', 'DESC']], // Ordenar por fecha de creación, de los más recientes
      limit: 20 // Limitar a los últimos 20 registros
    });

    res.status(200).send(associations);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener las asociaciones de humedad baja." });
  }
};
