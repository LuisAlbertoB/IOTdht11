const db = require("../models");
const SensorData = db.sensorData;

// Crear un nuevo dato de sensor
exports.createSensorData = async (req, res) => {
  try {
    const { temperature, humidity, timestamp } = req.body;

    if (!temperature || !humidity) {
      return res.status(400).send({ message: "Datos de temperatura y humedad son requeridos" });
    }

    const data = await SensorData.create({
      temperature,
      humidity,
      timestamp: timestamp || new Date(),
    });

    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al guardar los datos del sensor" });
  }
};

// Obtener todos los datos del sensor
exports.getAllSensorData = async (req, res) => {
  try {
    const data = await SensorData.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al obtener los datos del sensor" });
  }
};

// Vaciar la tabla (solo para administradores)
exports.clearSensorData = async (req, res) => {
  try {
    await SensorData.destroy({ where: {}, truncate: true });
    res.status(200).send({ message: "Datos de la tabla sensor_data eliminados exitosamente" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error al vaciar la tabla" });
  }
};
