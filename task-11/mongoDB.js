const express = require("express")
const mongoose = require("mongoose");
const app = express();
app.use(express.json())
const port = 3000;


mongoose.connect('mongodb+srv://myUser:myPassword@cluster0.abcde.mongodb.net/myDatabase')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is working!');
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    inStock: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

const Product = mongoose.model("Product", productSchema);


app.post("/product",async(req, res)=>{
const product = new Product(req.body);
const saved = await product.save();
res.json(saved)
})

app.get("/product", async(req,res)=>{
    const products = await Product.find();
    res.json(products);
})

app.get("/product/:id",async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.json(product)
})

app.put("/product/:id", async(req,res)=>{
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.json(updated);
})

app.delete("/product/:id", async(req, res)=>{
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json({mesage: "Product Deleted"})
})

app.listen(3000,()=>{
    console.log('Server running on the port 3000')
})