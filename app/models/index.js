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
db.temperatureHigh = require("./temperatureHigh.model.js")(sequelize, Sequelize);
db.temperatureLow = require("./temperatureLow.model.js")(sequelize, Sequelize);
db.humidityHigh = require("./humidityHigh.model.js")(sequelize, Sequelize);
db.humidityLow = require("./humidityLow.model.js")(sequelize, Sequelize);

// Relaciones entre modelos
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

// Relaciones con SensorData
db.sensorData.hasMany(db.temperatureHigh, { foreignKey: "sensorDataId" });
db.sensorData.hasMany(db.temperatureLow, { foreignKey: "sensorDataId" });
db.sensorData.hasMany(db.humidityHigh, { foreignKey: "sensorDataId" });
db.sensorData.hasMany(db.humidityLow, { foreignKey: "sensorDataId" });

db.temperatureHigh.belongsTo(db.sensorData, { foreignKey: "sensorDataId" });
db.temperatureLow.belongsTo(db.sensorData, { foreignKey: "sensorDataId" });
db.humidityHigh.belongsTo(db.sensorData, { foreignKey: "sensorDataId" });
db.humidityLow.belongsTo(db.sensorData, { foreignKey: "sensorDataId" });

// Sincronización de las tablas con la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced successfully.");
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
