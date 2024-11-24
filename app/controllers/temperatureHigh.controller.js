const db = require("../models");
const TemperatureHigh = db.temperatureHigh;
const SensorData = db.sensorData;

exports.getAllTemperatureHigh = async (req, res) => {
  try {
    const data = await TemperatureHigh.findAll({
      include: [{
        model: SensorData,
        attributes: ['temperature', 'humidity', 'timestamp']
      }]
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener los datos de temperatura alta" });
  }
};

// Asociar registros de temperatura alta a la tabla TemperatureHigh
exports.associateHighTemperatures = async (req, res) => {
  try {
    // Paso 1: Obtener todos los registros de la tabla sensorData
    const sensorData = await SensorData.findAll();
    
    // Paso 2: Filtrar los registros con temperaturas elevadas (ajustar el umbral según lo necesites)
    const highTemperatureRecords = sensorData.filter(record => record.temperature > 30); // Asumimos que 30°C es el umbral

    // Paso 3: Verificar si esos registros ya están asociados con 'TemperatureHigh'
    for (const record of highTemperatureRecords) {
      const existingAssociation = await TemperatureHigh.findOne({
        where: { sensorDataId: record.id }
      });

      // Si no está asociado, crear la asociación
      if (!existingAssociation) {
        await TemperatureHigh.create({
          sensorDataId: record.id
        });
      }
    }

    res.status(200).send({ message: "Asociación de registros con temperaturas elevadas completada." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al asociar las temperaturas elevadas." });
  }
};
