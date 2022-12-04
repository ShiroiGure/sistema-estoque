const Products = require("../models/ProductModel");

class ProductController {

  async index(_, res) {
    let products = await Products.findAll({
      attributes: {exclude: ['categoryId']},
      include: ['categories']
    });
    
    if(products.length) return res.json(products);

    return res.status(404).json({ err: "No product was found" });
  }

  async create(req, res) {

    let {
      name,
      quantidade,
      price,
      categoryId
    } = JSON.parse(req.body.body);

    let productExists = await Products.findOne({
      where: {name: name}
    });

    if(productExists) return res.status(403).json({
      err: "Product already exists"
    });

    let newProduct = await Products.create({
      name,
      quantidade,
      price,
      image: req.file.filename,
      categoryId
    });

    return res.json(newProduct);
  }

  async findById(req, res) {
    const {id} = req.params;

    let productExists = await Products.findOne({
      where: {id: id}
    });

    if(productExists) return res.json(productExists);

    return res.status(404).json({
      err: "Product does not exists"
    });
  }

  async update(req, res) {
    let {
      id,
      quantidade,
      price
    } = req.body

    let productExists = await Products.findOne({
      where: {id: id}
    });

    if(productExists) {
      let newProduct = await Products.update({
        quantidade,
        price
      }, {where: {id}})

      return res.json(newProduct);
    }

    return res.status(404).json({
      err: "Product does not exists"
    });
  }

  async delete(req, res) {
    let {
      id
    } = req.params;

    let productExists = await Products.findOne({
      where: {id: id}
    });

    if(productExists) {
      await Products.destroy({
        where: {id: id}
      })

      return res.json({msg: "Product deleted successfully"});
    }

    return res.status(404).json({
      err: "Product does not exists"
    });
  }

  async getImage(req, res) {
    const {filename} = req.params;

    return res.sendFile(filename, {root: './uploads'});
  }
}

module.exports = new ProductController();