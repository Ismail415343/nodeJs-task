const express = require("express")
const app = express();

const port = 3000;

app.use(express.json());

let products = []
let orders = []

let productIdCounter = 1;
let orderIDCounter = 1;


app.post('/product', (req, res)=>{
    const{name, price, stock} = req.body;

if(!name || price == null ||stock == null){
    return res.status(400).json({error: "name, price and stock are required"})
}
if(typeof price !=="number" || price <= 0){
    return res.status(400).json({error: "price must be greater than 0"})
}
if(typeof stock !== "number" || stock < 0){
    return res.status(400).json({error: "stock must be a number ≥ 0"});
}


const newProduct = {
    id: productIdCounter++,
    name,
    price,
    stock
}

products.push(newProduct);
res.json(newProduct)

})


app.get("/product", (req,res)=>{
    res.json(products)
   
})


app.post("/order", (req,res)=>{
    const {productId, quantity} = req.body;

if(productId == null || quantity == null){
    return res.status(400).json({error: "product id and quantity required"})
}


const product = products.find(p=> p.id===productId);
if(!product){
    return res.status(400).json({error: "product not found"})
}

if(product.stock < quantity){
    return res.status(400).json({error: "not enough stock"})
}


product.stock -= quantity;
const order={
    id: orderIDCounter++,
    productId,
    quantity,
    totalPrice: product.price * quantity
}

orders.push(order)


res.json({
    status: "success",
    order
})


})

app.get('/order', (req,res)=>{
    res.json(orders)
})

app.listen(port,()=>{
    console.log( `server running on http://localhost:${port} `);
})