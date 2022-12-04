const Users = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "aaa";

class UserController {

  async index(_, res) {
    let users = await Users.findAll({attributes: ['name', 'email', 'permission']});

    if (users.length) return res.json(users);

    return res.status(404).json({ err: "No user was found" });
  }

  async create(req, res) {
    const {
      name,
      email,
      password,
    } = req.body;

    let userExists = await Users.findOne({
      where: { email }
    });

    if (userExists) return res.status(403).json({
      err: "User already exists"
    });

    let newUser = await Users.create({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    return res.status(201).json({
      msg: "User created",
      user: {
        email: newUser.email,
        role: newUser.permission
      },
      token: jwt.sign({
        email: newUser.email,
        role: newUser.permission
      },
      SECRET_KEY),
    });
  }

  async login(req, res) {

    const {
      email,
      password
    } = req.body;
    
    let user = await Users.findOne({ where: { email } });
    
    if (user) {

      let result = await bcrypt.compare(password, user.password);
      
      if (result)
        return res.json({
          token: jwt.sign({
            email: user.email,
            role: user.permission
          },
          SECRET_KEY),
          email,
          role: user.permission
        });

      return res.status(403).json({ err: "Invalid credentials" });
    }
    return res.status(403).json({ err: "Invalid credentials" });
  }
  
  async verify(req, res) {
    const authToken = req.headers['authorization'];
    let token = authToken.split(' ')[1];
    let data = jwt.verify(token, SECRET_KEY);

    return res.json(data);
  }
}

module.exports = new UserController();