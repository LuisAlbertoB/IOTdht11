const db = require("../models");
const Cultivo = db.cultivo;
const User = db.user;

// Crear un nuevo cultivo
exports.createCultivo = (req, res) => {
  const { nombre, temp_suelo, temp_aire, humedad, iluminacion, user_id } = req.body;

  // Validación básica
  if (!nombre || !temp_suelo || !temp_aire || !humedad || !iluminacion || !user_id) {
    return res.status(400).send({ message: "Todos los campos son requeridos." });
  }

  // Crear y guardar el cultivo
  Cultivo.create({ nombre, temp_suelo, temp_aire, humedad, iluminacion, user_id })
    .then((cultivo) => {
      res.status(201).send({ message: "Cultivo creado exitosamente.", cultivo });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al crear el cultivo." });
    });
};

// Obtener un cultivo por ID
exports.getCultivoById = (req, res) => {
  const id = req.params.id;

  Cultivo.findByPk(id, { include: [{ model: User, as: 'user' }] })
    .then((cultivo) => {
      if (!cultivo) {
        return res.status(404).send({ message: "Cultivo no encontrado." });
      }
      res.status(200).send(cultivo);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al obtener el cultivo." });
    });
};

// Obtener todos los cultivos (opción para filtrar por usuario)
exports.getAllCultivos = (req, res) => {
  const userId = req.query.user_id; // Filtrar por usuario si se proporciona

  const whereClause = userId ? { user_id: userId } : {};

  Cultivo.findAll({ where: whereClause, include: [{ model: User, as: 'user' }] })
    .then((cultivos) => {
      res.status(200).send(cultivos);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al obtener los cultivos." });
    });
};

// Eliminar un cultivo por ID
exports.deleteCultivo = (req, res) => {
  const id = req.params.id;

  Cultivo.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.status(200).send({ message: "Cultivo eliminado exitosamente." });
      } else {
        res.status(404).send({ message: "Cultivo no encontrado." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al eliminar el cultivo." });
    });
};

// Actualizar un cultivo por ID
exports.updateCultivo = (req, res) => {
  const id = req.params.id;
  const { nombre, temp_suelo, temp_aire, humedad, iluminacion } = req.body;

  // Validación básica
  if (!nombre || !temp_suelo || !temp_aire || !humedad || !iluminacion) {
    return res.status(400).send({ message: "Todos los campos son requeridos." });
  }

  Cultivo.findByPk(id)
    .then((cultivo) => {
      if (!cultivo) {
        return res.status(404).send({ message: "Cultivo no encontrado." });
      }

      // Actualizar los campos del cultivo
      cultivo.nombre = nombre;
      cultivo.temp_suelo = temp_suelo;
      cultivo.temp_aire = temp_aire;
      cultivo.humedad = humedad;
      cultivo.iluminacion = iluminacion;

      // Guardar los cambios
      cultivo.save()
        .then(() => {
          res.status(200).send({ message: "Cultivo actualizado exitosamente.", cultivo });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message || "Error al actualizar el cultivo." });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al buscar el cultivo." });
    });
};
