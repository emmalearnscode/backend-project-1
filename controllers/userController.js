const crud = require("../models/crud/crudFunctions");

const createNewUser = async (req, res) => {
  const newUser = req.body;
  //Validate email and password - could add regex here to develop further
  if (!newUser.email || !newUser.password || newUser.password.length < 6) {
    res
      .status(400)
      .json({ message: "Please provide valid username or password" });
  } else {
    const response = await crud.createNewUser(newUser); //Hur hanterar man detta om det misslyckas? Hur returnerar man en res.status meddelande istället?
    res.json(response);
  }
};

const loginUser = async (req, res) => {
  const user = req.body;
  if (!user.email || !user.password || user.password.length < 6) {
    res
      .status(400)
      .json({ message: "Please provide valid username or password" });
  } else {
    const response = await crud.loginUser(user);
    res.json(response);
  }
};

module.exports = { createNewUser, loginUser };
