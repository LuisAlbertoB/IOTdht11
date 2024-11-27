const db = require("../models");
const TemperatureHigh = db.temperatureHigh;  // Tabla de temperatura alta
const SensorData = db.sensorData;
const { Op } = require("sequelize");

// Método para asociar los registros de temperatura alta
exports.associateHighTemperature = async (req, res) => {
  try {
    // Umbral de temperatura para considerar "alta" (ajustable según necesidad)
    const highTemperatureThreshold = 30; // Ejemplo, 30°C de temperatura

    // Buscar registros de SensorData con temperatura alta
    const highTemperatureData = await SensorData.findAll({
      where: {
        temperature: {
          [Op.gt]: highTemperatureThreshold
        }
      }
    });

    // Recorrer los datos de SensorData y asociarlos a la tabla TemperatureHigh
    for (let data of highTemperatureData) {
      // Verificar si el sensorDataId ya está asociado en TemperatureHigh
      const existingAssociation = await TemperatureHigh.findOne({
        where: { sensorDataId: data.id }
      });

      // Si no existe la asociación, crearla
      if (!existingAssociation) {
        await TemperatureHigh.create({
          sensorDataId: data.id
        });
      }
    }

    res.status(200).send({ message: "Asociación de registros con temperatura alta completada." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al asociar temperatura alta." });
  }
};

// Método para obtener los últimos 20 registros de temperatura alta
exports.getRecentTemperatureHigh = async (req, res) => {
  try {
    // Obtener los últimos 20 registros de temperatura alta
    const data = await TemperatureHigh.findAll({
      include: [{
        model: SensorData,
        attributes: ['temperature', 'humidity', 'timestamp']
      }],
      order: [['createdAt', 'DESC']],
      limit: 20
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener los registros de temperatura alta." });
  }
};
