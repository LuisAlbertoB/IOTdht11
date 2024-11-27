const db = require("../models");
const TemperatureLow = db.temperatureLow;  // Tabla de temperatura baja
const SensorData = db.sensorData;
const { Op } = require("sequelize");

// Método para asociar los registros de temperatura baja
exports.associateLowTemperature = async (req, res) => {
  try {
    // Umbral de temperatura para considerar "baja" (ajustable según necesidad)
    const lowTemperatureThreshold = 5; // Ejemplo, 5°C de temperatura

    // Buscar registros de SensorData con temperatura baja
    const lowTemperatureData = await SensorData.findAll({
      where: {
        temperature: {
          [Op.lt]: lowTemperatureThreshold
        }
      }
    });

    // Recorrer los datos de SensorData y asociarlos a la tabla TemperatureLow
    for (let data of lowTemperatureData) {
      // Verificar si el sensorDataId ya está asociado en TemperatureLow
      const existingAssociation = await TemperatureLow.findOne({
        where: { sensorDataId: data.id }
      });

      // Si no existe la asociación, crearla
      if (!existingAssociation) {
        await TemperatureLow.create({
          sensorDataId: data.id
        });
      }
    }

    res.status(200).send({ message: "Asociación de registros con temperatura baja completada." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al asociar temperatura baja." });
  }
};

// Método para obtener los últimos 20 registros de temperatura baja
exports.getRecentTemperatureLow = async (req, res) => {
  try {
    const data = await TemperatureLow.findAll({
      include: [{
        model: SensorData,
        attributes: ['temperature', 'humidity', 'timestamp']
      }],
      order: [['createdAt', 'DESC']],
      limit: 20
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener los registros de temperatura baja." });
  }
};
