const Product = require('../Models/Product');

// Controller to create a new Product
exports.addProduct = async (req, res) => {
  const { title,description,price,category,qty,image} = req.body;

  try {
    const product = new Product({ title,description,price,category,qty,image });
    await product.save();
    res.status(201).json({message:'Product Add Successfully',product});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all Product
exports.getProduct = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments();

    res.status(200).json({
      products: products,
      total: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const  id  = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Product
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).json({
        status: "FAILURE",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "SUCCESS",
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// //delete api
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProduct = async (req, res) => {
  const { key } = req.query;
  let query = {};
  if (key) {
    const regex = new RegExp(`^${key}`, 'i'); 
    query = {
      "$or": [
        { name: regex }
      ]
    };
  }

  try {
    const Product = await Product.find(query);
    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


