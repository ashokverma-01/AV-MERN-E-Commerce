const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Mern-E-Commerce", {
  
})
.then(() => {
    console.log("Connection successful");
})
.catch((error) => {
    console.error("Connection error:", error.message); 
});
