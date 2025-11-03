let users = [
  { id: 1, name: "Tuan Anh" },
  { id: 2, name: "Minh Quang" }
];

const getUsers = (req, res) => {
  res.json(users);
};

const addUser = (req, res) => {
  const { name } = req.body;
  const newUser = {
    id: users.length + 1,
    name
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = { getUsers, addUser };
