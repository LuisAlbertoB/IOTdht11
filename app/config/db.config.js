module.exports = {
  HOST: "127.0.0.1",
  USER: "integrador",
  PASSWORD: "123456",
  DB: "ProyectoIntegrador",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
