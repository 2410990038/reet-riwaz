const Product = require('../models/Product');

// GET /api/products — get all or filter by category
const getProducts = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/products/seed — seed all products at once
const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});

    const products = [
      // Women
      { name: "Silk Saree", price: "₹2,499", priceValue: 2499, rating: 4.5, desc: "Elegant ethnic silk saree", category: "women", image: "https://vardanethnic.in/wp-content/uploads/2025/08/Vardan-Ethnic-Ast-Shubharambh-Wholesale-Banarasi-Silk-Saree-Collection-6.webp" },
      { name: "Lehenga Set", price: "₹4,999", priceValue: 4999, rating: 4.8, desc: "Traditional bridal lehenga", category: "women", image: "https://maharanidesigner.com/wp-content/uploads/2020/08/Punjabi-Bridal-Lehenga.jpeg.webp" },
      { name: "Kurti", price: "₹1,199", priceValue: 1199, rating: 4.3, desc: "Comfortable cotton kurti", category: "women", image: "https://cdn.sareeka.com/image/cache/data2023/handwork-aqua-blue-designer-kurti-254947-1000x1375.jpg" },
      // Men
      { name: "Sherwani", price: "₹3,999", priceValue: 3999, rating: 4.7, desc: "Royal embroidered sherwani", category: "men", image: "https://i.pinimg.com/736x/90/6c/31/906c31109cfc073f74aaba9e07712947.jpg" },
      { name: "Kurta Pajama", price: "₹1,799", priceValue: 1799, rating: 4.4, desc: "Classic festive wear", category: "men", image: "https://i.etsystatic.com/35384727/r/il/f45eaa/6357957683/il_fullxfull.6357957683_4sny.jpg" },
      { name: "Nehru Jacket", price: "₹1,299", priceValue: 1299, rating: 4.6, desc: "Stylish Nehru jacket", category: "men", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaS2QB_8y1jKvfY_-1U_QR_RcG_5y07THy9g&s" },
      // Kids
      { name: "Ethnic Set", price: "₹999", priceValue: 999, rating: 4.5, desc: "Traditional festive outfit", category: "kids", image: "https://peekaabookids.com/cdn/shop/files/173_b1966b97-0cec-4166-aa24-82fd72e40f74.jpg?v=1756801554&width=533" },
      { name: "Kurta Set", price: "₹899", priceValue: 899, rating: 4.2, desc: "Comfortable cotton kurta", category: "kids", image: "https://www.kidbea.com/cdn/shop/files/m1_1024x1024.jpg?v=1754552947" },
      { name: "Frock", price: "₹1,099", priceValue: 1099, rating: 4.7, desc: "Beautiful party frock", category: "kids", image: "https://lagorii.com/cdn/shop/files/purple-ruffled-net-tailback-frock-with-floral-and-butterfly-embellishment-for-girls-lagorii-kids-1_533x.jpg" },
    ];

    await Product.insertMany(products);
    res.status(201).json({ message: `${products.length} products seeded successfully!` });
  } catch (error) {
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
};

module.exports = { getProducts, getProductById, seedProducts };


