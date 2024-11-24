const db = require("../models");
const TemperatureLow = db.temperatureLow;
const SensorData = db.sensorData;
const { Op } = require("sequelize");

// Obtener todas las temperaturas bajas con datos relacionados de sensorData
exports.getAllTemperatureLow = async (req, res) => {
  try {
    const data = await TemperatureLow.findAll({
      include: [{
        model: SensorData,
        attributes: ['temperature', 'humidity', 'timestamp']
      }]
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener los datos de temperatura baja" });
  }
};

// Asociar registros de temperatura baja a la tabla TemperatureLow
exports.associateLowTemperatures = async (req, res) => {
  try {
    // Umbral de temperatura para considerar "baja" (ajustable según necesidad)
    const lowTemperatureThreshold = 10; // Ejemplo, 10°C

    // Buscar registros de SensorData con temperaturas bajas
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

    res.status(200).send({ message: "Asociación de registros con temperaturas bajas completada." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al asociar temperaturas bajas." });
  }
};
