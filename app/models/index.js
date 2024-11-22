const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.cultivo = require("./cultivo.model.js")(sequelize, Sequelize);
db.parcela = require("./pasela.model.js")(sequelize, Sequelize);
db.sensorData = require("./sensorData.model.js")(sequelize, Sequelize);

// Relaciones
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

// Sincronización de las tablas con la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced successfully.");
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
