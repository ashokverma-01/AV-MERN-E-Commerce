const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');


require("./db/connection.js")
const userRouter = require('./Routes/User.js');
const productRouter = require('./Routes/Product.js') 
const cartRouter = require('./Routes/Cart.js');
const addressRouter = require('./Routes/Address.js')

app.use(bodyParser.json());
app.use(express.json());
app.use(cors(
    {
        origin:true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials:true
    }
));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/user', express.static(path.join(__dirname, '/user')));
app.use("/api/user",userRouter);
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)

// In your Express server setup
const port = process.env.PORT || 5000; // Use a safe port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




