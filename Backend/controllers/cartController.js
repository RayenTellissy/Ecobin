const supabase = require("../supabase/Supabase_Connect");

const calculateTotalPoints = (products) => {
  let totalPoints = 0;
  for (const product of products) {
    totalPoints += product.points;
  }
  return totalPoints;
};

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = user.cart || []; // Initialize cart as an array if it's undefined or null

    const updatedCart = [...cart, productId];

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({ cart: updatedCart })
      .eq("id", userId)
      .single();

    if (updateError || !updatedUser) {
      console.error("Failed to update user's cart:", updateError);
      return res.status(500).json({ error: "Failed to update user's cart" });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("cart")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = user.cart || [];

    const updatedCart = cart.filter((item) => item !== productId);

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({ cart: updatedCart })
      .eq("id", userId)
      .single();

    if (updateError || !updatedUser) {
      console.error("Failed to update user's cart:", updateError);
      return res.status(500).json({ error: "Failed to update user's cart" });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCarts = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = user.cart || [];

    return res.json(cart);
  } catch (error) {
    console.error("Error retrieving user's cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getCartProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("cart")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = user.cart || [];
    const { data: products, error: productError } = await supabase
      .from("Shop")
      .select()
      .in("id", cart);

    if (productError || !products) {
      console.error("Failed to fetch cart products:", productError);
      return res.status(500).json({ error: "Failed to fetch cart products" });
    }

    return res.json(products);
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("Shop")
      .select();

    if (error || !products) {
      console.error("Failed to fetch products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }

    return res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const confirmPurchase =async (req, res) => {
  const { userId } = req.params;
  const { cart } = req.body;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('balance')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data: products, error: productsError } = await supabase
      .from('Shop') 
      .select('id, points')
      .in('id', cart);

    if (productsError) {
      return res.status(500).json({ error: 'Error fetching product details' });
    }

    const totalPoints = calculateTotalPoints(products);
    const updatedBalance = user.balance - totalPoints;

    if (updatedBalance < 0) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    await supabase
      .from('users')
      .update({ balance: updatedBalance })
      .eq('id', userId);

    // Clear the user's cart by setting it to an empty array
    await supabase
      .from('users')
      .update({ cart: [] })
      .eq('id', userId);

    return res.json({ balance: updatedBalance });
  } catch (error) {
    console.error('Error confirming purchase:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getUserBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    const balance = user.balance || 0;

    return res.json({ balance });
  } catch (error) {
    console.error("Error retrieving user's balance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getAllCarts,
  getCartProducts,
  getAllProducts,
  confirmPurchase,
  getUserBalance,
};
