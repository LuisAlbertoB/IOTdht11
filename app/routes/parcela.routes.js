const { authJwt } = require("../middleware");
const parcelaController = require("../controllers/parcela.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/parcela",
    [authJwt.verifyToken, authJwt.isAdmin],
    parcelaController.createParcela
  );

  app.get(
    "/api/parcela/:id",
    [authJwt.verifyToken],
    parcelaController.getParcelaById
  );

  app.get(
    "/api/parcelas",
    [authJwt.verifyToken],
    parcelaController.getAllParcelas
  );

  app.put(
    "/api/parcela/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    parcelaController.updateParcela
  );

  app.delete(
    "/api/parcela/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    parcelaController.deleteParcela
  );
};
