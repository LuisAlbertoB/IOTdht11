module.exports = (app) => {
    const spoiledBreadController = require("../controllers/spoiledBread.controller.js");
  
    // Ruta para calcular la probabilidad de que el pan se eche a perder
    app.get("/api/spoiled-bread/probability", spoiledBreadController.getDecompositionProbability);
};
