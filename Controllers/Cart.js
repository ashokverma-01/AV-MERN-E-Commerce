const Cart = require("../Models/Cart.js");

exports.addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, image } = req.body;
    const userId = req.user;

    // Find the user's cart
    let cartItem = await Cart.findOne({ userId });

    if (!cartItem) {
      cartItem = new Cart({userId,items: []})
    }
      // If cart exists, find the item and update quantity and price
      const itemIndex = cartItem.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // If item exists, update the quantity and price
        cartItem.items[itemIndex].qty += qty;
        cartItem.items[itemIndex].price += price * qty;
      } else {
        // If item does not exist, add it to the cart
        cartItem.items.push({ productId, title, price, qty, image });
      }
  

    await cartItem.save();
    res.status(201).json({ message: "Items Added To Cart", cart: cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Get all items in the cart for a user
exports.getCartItems = async (req, res) => {
  
    const userId = req.user;
    const cartItems = await Cart.findOne({ userId });

    if(!cartItems) return res.json({message:"Cart Not Found"})
       res.json({message:"User Cart",cartItems})
  }

// Remove an item from the cart
exports.removeCartItems = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;
    
    // Find the cart for the user
    const cartItems = await Cart.findOne({ userId });
    
    if (!cartItems) {
      return res.json({ message: "Cart Not Found" });
    }
    
    // Filter out the item to remove from the cart
    cartItems.items = cartItems.items.filter((item) => item.productId.toString() !== productId);
    
    // Save the updated cart
    await cartItems.save();
    
    res.json({ message: "Product Removed From Cart", cartItems });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error: error.message });
  }
};

// Clear the cart for a user
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user;
    
    // Find the cart for the user
    const cartItems = await Cart.findOne({ userId });
    
    if (!cartItems) {
      return res.json({ message: "Cart Not Found" });
    }
    
    // Clear all items in the cart
    cartItems.items = [];
    
    // Save the updated cart
    await cartItems.save();
    
    res.json({ message: "Cart Cleared", cartItems });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error.message });
  }
};

//decrease qunantity api
exports.decreaseProductQty = async (req, res) => {
  try {
    const { productId,qty } = req.body;
    const userId = req.user;

    // Find the user's cart
    let cartItem = await Cart.findOne({ userId });

    if (!cartItem) {
      cartItem = new Cart({userId,items: []})
    }
      // If cart exists, find the item and update quantity and price
      const itemIndex = cartItem.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // If item exists, update the quantity and price
        const item = cartItem.items[itemIndex]
        if(item.qty >qty){
          const pricePerUnit = item.price/item.qty;
          item.qty -= qty
          item.price -=pricePerUnit*qty
        }else{
          cartItem.items.splice(itemIndex, 1)
        }

      } else {
        // If item does not exist, add it to the cart
        return res.json({message:"Invalid Product id"})
      }
  

    await cartItem.save();
    res.status(201).json({ message: "Items Qty Decresed", cart: cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

