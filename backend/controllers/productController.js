import asyncHandler from "../middlewares/asyncHandler.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const productsFilePath = path.join(__dirName, "..", "products.json");

const getProductsData = async () => {
  try {
    const data = await fs.readFile(productsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveProductsData = async (data) => {
  await fs.writeFile(productsFilePath, JSON.stringify(data, null, 2));
};

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name: return res.json({ error: "Name is required" });
      case !brand: return res.json({ error: "Brand is required" });
      case !description: return res.json({ error: "Description is required" });
      case !price: return res.json({ error: "Price is required" });
      case !category: return res.json({ error: "Category is required" });
      case !quantity: return res.json({ error: "Quantity is required" });
    }

    const products = await getProductsData();
    const newProduct = { ...req.fields, _id: new Date().getTime().toString(), reviews: [], rating: 0, numReviews: 0, countInStock: quantity };
    products.push(newProduct);
    await saveProductsData(products);
    
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name: return res.json({ error: "Name is required" });
      case !brand: return res.json({ error: "Brand is required" });
      case !description: return res.json({ error: "Description is required" });
      case !price: return res.json({ error: "Price is required" });
      case !category: return res.json({ error: "Category is required" });
      case !quantity: return res.json({ error: "Quantity is required" });
    }

    let products = await getProductsData();
    const index = products.findIndex(p => p._id === req.params.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.fields };
      await saveProductsData(products);
      res.json(products[index]);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    let products = await getProductsData();
    products = products.filter(p => p._id !== req.params.id);
    await saveProductsData(products);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    let products = await getProductsData();

    if (req.query.keyword) {
      products = products.filter(p => p.name.toLowerCase().includes(req.query.keyword.toLowerCase()));
    }

    const count = products.length;
    res.json({
      products: products.slice(0, pageSize),
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const products = await getProductsData();
    const product = products.find(p => p._id === req.params.id);
    if (product) {
       return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await getProductsData();
    
    res.json(products.slice(0, 12));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    let products = await getProductsData();
    const index = products.findIndex(p => p._id === req.params.id);
    
    if (index !== -1) {
      let product = products[index];
      const review = {
        name: req.user ? req.user.username : 'Anonymous',
        rating: Number(rating),
        comment,
        user: req.user ? req.user._id : 'Anonymous',
      };

      if (!product.reviews) product.reviews = [];
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
      
      products[index] = product;
      await saveProductsData(products);
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await getProductsData();
    products.sort((a, b) => b.rating - a.rating);
    res.json(products.slice(0, 4));
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await getProductsData();
    res.json(products.slice(0, 5));
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let products = await getProductsData();

    if (checked && checked.length > 0) {
      products = products.filter(p => checked.includes(p.category));
    }
    
    if (radio && radio.length === 2) {
      products = products.filter(p => p.price >= radio[0] && p.price <= radio[1]);
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
