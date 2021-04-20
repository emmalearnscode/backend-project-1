const crud = require("../models/crud/crudFunctions");

const createNewUser = async (req, res) => {
  const newUser = req.body;
  const response = await crud.createNewUser(newUser); //Hur hanterar man detta om det misslyckas? Hur returnerar man en res.status meddelande istället?
  res.json(response);
};

module.exports = { createNewUser };
