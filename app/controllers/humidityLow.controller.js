const db = require("../models");
const HumidityLow = db.humidityLow;
const SensorData = db.sensorData;
const { Op } = require("sequelize");

exports.associateLowHumidity = async (req, res) => {
  try {
    // Umbral de humedad para considerar "baja" (ajustable según necesidad)
    const lowHumidityThreshold = 30; // Ejemplo, 30% de humedad

    // Buscar registros de SensorData con humedad baja
    const lowHumidityData = await SensorData.findAll({
      where: {
        humidity: {
          [Op.lt]: lowHumidityThreshold
        }
      }
    });

    // Recorrer los datos de SensorData y asociarlos a la tabla HumidityLow
    for (let data of lowHumidityData) {
      // Verificar si el sensorDataId ya está asociado en HumidityLow
      const existingAssociation = await HumidityLow.findOne({
        where: { sensorDataId: data.id }
      });

      // Si no existe la asociación, crearla
      if (!existingAssociation) {
        await HumidityLow.create({
          sensorDataId: data.id
        });
      }
    }

    res.status(200).send({ message: "Asociación de registros con humedad baja completada." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al asociar humedad baja." });
  }
};
