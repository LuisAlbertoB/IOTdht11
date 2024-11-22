module.exports = (sequelize, Sequelize) => {
  const SensorData = sequelize.define("sensor_data", {
    temperature: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    humidity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  return SensorData;
};
