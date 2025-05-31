let users = [];
// funcion que devuelve todos los usuarios almacenados

function getAllUsers(req, res) {

  res.json(users);
}

// crear un nuevo usuario si se proveen name e email válidos
function createUser(req, res) {
  const { name, email } = req.body;

  //validacion básica
  //valonres nulos
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  //correos iguales
  if (users.some(user => user.email === email)){
    return res.status(400).json({error: 'El correo ya existe'});
  }

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);

}

module.exports = {
  getAllUsers,
  createUser
};
