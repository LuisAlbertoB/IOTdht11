const { authJwt } = require("../middleware");
const cultivoController = require("../controllers/cultivo.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Crear un cultivo (solo admin)
  app.post(
    "/api/cultivo",
    [authJwt.verifyToken, authJwt.isAdmin],
    cultivoController.createCultivo
  );

  // Obtener un cultivo por ID
  app.get(
    "/api/cultivo/:id",
    [authJwt.verifyToken],
    cultivoController.getCultivoById
  );

  // Obtener todos los cultivos (puede incluir los de un usuario específico)
  app.get(
    "/api/cultivos",
    [authJwt.verifyToken],
    cultivoController.getAllCultivos
  );

  // Eliminar un cultivo por ID (solo admin)
  app.delete(
    "/api/cultivo/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    cultivoController.deleteCultivo
  );

  // Actualizar un cultivo por ID (solo admin)
  app.put(
    "/api/cultivo/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    cultivoController.updateCultivo
  );
};
