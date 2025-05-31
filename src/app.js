const express = require('express');
const userRoutes = require('./routes/user.routes');
const app = express();

//middleware para parsear el body de las peticiones
app.use(express.json());

//ruta para gestionar usuarios
app.use('/api/users', userRoutes);

//manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//exportar la app para usarla en otros archivos
module.exports = app;