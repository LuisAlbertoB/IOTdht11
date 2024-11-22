const mqtt = require("mqtt");
const dayjs = require('dayjs');
const db = require("../models"); // Asegúrate de que el path sea correcto
const SensorData = db.sensorData; // Modelo de sensor_data

// Configura el cliente MQTT
const client = mqtt.connect('mqtt://98.85.171.115', {
  username: 'ubuntu',
  password: 'pezcadofrito.1'
});

// Conectar al broker
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  // Suscribirse al tema "sensores"
  client.subscribe('sensores', (err) => {
    if (err) {
      console.log('Error al suscribirse al tema "sensores"', err);
    } else {
      console.log('Suscrito al tema: sensores');
    }
  });
});

// Manejar los mensajes recibidos
client.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const { timestamp, sensorData } = data;

    // Convertir el timestamp a un formato de fecha válido para MySQL
    const mysqlTimestamp = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');

    // Insertar datos en la base de datos
    await SensorData.create({
      temperature: sensorData.temperature,
      humidity: sensorData.humidity,
      timestamp: mysqlTimestamp, // Fecha convertida
    });

    console.log('Datos guardados exitosamente en la base de datos');
  } catch (error) {
    console.error('Error al procesar o guardar el mensaje:', error.message);
  }
});

module.exports = client;
