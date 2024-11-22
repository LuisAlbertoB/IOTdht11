const db = require("../models");
const HumidityHigh = db.humidityHigh;
const SensorData = db.sensorData;
const { Op } = require("sequelize");

exports.associateHighHumidity = async (req, res) => {
  try {
    // Umbral de humedad para considerar "alta" (ajustable según necesidad)
    const highHumidityThreshold = 80; // Ejemplo, 80% de humedad

    // Buscar registros de SensorData con humedad alta
    const highHumidityData = await SensorData.findAll({
      where: {
        humidity: {
          [Op.gt]: highHumidityThreshold
        }
      }
    });

    // Recorrer los datos de SensorData y asociarlos a la tabla HumidityHigh
    for (let data of highHumidityData) {
      // Verificar si el sensorDataId ya está asociado en HumidityHigh
      const existingAssociation = await HumidityHigh.findOne({
        where: { sensorDataId: data.id }
      });

      // Si no existe la asociación, crearla
      if (!existingAssociation) {
        await HumidityHigh.create({
          sensorDataId: data.id
        });
      }
    }

    res.status(200).send({ message: "Asociación de registros con humedad alta completada." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al asociar humedad alta." });
  }
};
