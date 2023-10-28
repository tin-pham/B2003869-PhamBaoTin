const Product = require("../models/product.model");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = this.queryString;

    // console.log({before: queryObj}); //before delete page

    const excludedFields = ["page", "sort", "limit"]; // clear Fields to query
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log({after: queryObj}); //after deletePage

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => `$${match}`,
    ); // define query in mongoose

    // gte = greater than or equal
    // lte = lesser than or equal
    // lt = lesser than
    // gt = greater than
    // regex = find characters in string

    this.query.find(JSON.parse(queryStr)); // find query in mongooseDB

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginating() {
    // define page and skip page
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// Filtering, sorting and paginating
const productController = {
  getProducts: async (req, res) => {
    try {
      const { page = 1, limit = 6, filter } = req.query;
      console.log(req.query);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const query = filter ? { category: filter } : {};

      const products = await Product.find(query).skip(startIndex).limit(limit);

      const count = await Product.countDocuments(query);

      const result = {
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        totalCount: count,
      };

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id: productId,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      // check images
      if (!images) {
        return res.status(400).json({ msg: "No image upload" });
      }

      // check product in category
      const product = await Product.findOne({ product_id: productId });
      if (product) {
        return res.status(400).json({ msg: "This product already exists" });
      }
      // create a new product
      const newProduct = new Product({
        product_id: productId,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      return res.json({ message: "created a new Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      return res.json({ message: "delete product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images) {
        return res.status(400).json({ msg: "No image upload" });
      }

      await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,

          images,
          category,
        },
      );

      return res.json({ message: "Update success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  Quality: async (req, res) => {
    const features = new APIfeatures(Product.find(), req.query)
      .filtering()
      .sorting()
      .paginating();
    // get all products
    const products = await features.query;
    return res.json(products.length);
  },
  getDetailProduct: async (req, res) => {
    const product = await Product.findOne({ product_id: req.params.id });
    // get all products
    return res.json(product);
  },
};

module.exports = productController;
