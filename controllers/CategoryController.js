const Category = require("../models/CategoryModel");

class CategoryController {

  async index(_, res) {

    let categories = await Category.findAll();
    
    if(categories.length) return res.json(categories);

    return res.status(404).json({ err: "No category was found" });
  } 

  async findOne(req, res) {
    const { id } = req.params;
   
    let category = await Category.findOne({
      where: {id: id}
    });

    if(category) return res.json(category);

    return res.status(404).json({ err: "No category was found"});
  }

  async create(req, res) {
    let {name} = req.body;

    let categoryExists = Category.findOne({
      where: {name: name}
    });

    if(!categoryExists) return res.status(403).json({
      err: "Category already exists"
    });

    let newCategory = await Category.create({name});

    return res.json(newCategory);
  }

  async delete(req, res) {
    let {id} = req.params

    let categoryExists = Category.findOne({where: {
      id: id
    }});

    if(categoryExists) {
      await Category.destroy({where: {
        id: id
      }});

      return res.json({msg: "Category deleted successfully"});
    }

    return res.status(404).json({
      err: "Category does not exists"
    });
  }
}

module.exports = new CategoryController();