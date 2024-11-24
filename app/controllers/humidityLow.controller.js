const db = require("../models");
const HumidityLow = db.humidityLow;
const SensorData = db.sensorData;
const { Op } = require("sequelize");

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

exports.getLowHumidityAssociations = async (req, res) => {
  try {
    // Obtener todas las asociaciones de humedad baja
    const associations = await HumidityLow.findAll({
      include: {
        model: SensorData,
        as: "sensor_datum", // Asegúrate de que el alias coincida con tu asociación en el modelo
        attributes: ['id', 'humidity', 'temperature'] // Los campos que deseas obtener
      }
    });

    res.status(200).send(associations);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener las asociaciones de humedad baja." });
  }
};
