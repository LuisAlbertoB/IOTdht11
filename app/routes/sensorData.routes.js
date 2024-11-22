const { authJwt } = require("../middleware");
const controller = require("../controllers/sensorData.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  // Ruta para crear datos de sensor
  app.post(
    "/api/sensors",
    [authJwt.verifyToken],
    controller.createSensorData
  );

  // Ruta para obtener todos los datos del sensor
  app.get(
    "/api/sensors",
    [authJwt.verifyToken],
    controller.getAllSensorData
  );

  // Ruta para vaciar la tabla (solo administradores)
  app.delete(
    "/api/sensors",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.clearSensorData
  );
};
