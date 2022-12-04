const express = require("express");
const router = express.Router();
const userController = require("./controllers/UserController");
const productController = require("./controllers/ProductController");
const categoryController = require("./controllers/CategoryController");
const AuthGuard = require("./middlewares/AuthGuard");
const multerConfig = require("./config/multerConfig");

const multer = require("multer");
const AdminGuard = require("./middlewares/AdminGuard");
const upload = multer({storage: multerConfig});

router.get('/verify',AuthGuard ,userController.verify);
router.get('/users',AdminGuard,userController.index);
router.get('/products', AuthGuard,productController.index);
router.get("/product/:id",AuthGuard ,productController.findById);
router.put('/product/update', AdminGuard ,productController.update);
router.delete("/product/delete/:id", AdminGuard ,productController.delete);
router.get("/categories",AuthGuard, categoryController.index);
router.get("/category/:id",AuthGuard, categoryController.findOne);
router.delete("/category/:id", AdminGuard ,categoryController.delete);
router.post('/createUser', userController.create);
router.post('/login', userController.login);
router.post('/createModel', AdminGuard,categoryController.create);
router.post("/createProduct", AdminGuard ,upload.single('photo') ,productController.create);
router.get('/productImage/:filename',productController.getImage);

module.exports = router;