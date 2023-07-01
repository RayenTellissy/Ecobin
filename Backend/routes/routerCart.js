const express = require('express');
const router = express.Router();
const {
    addToCart,
    removeFromCart,
    getAllCarts,
    getCartProducts,
    getAllProducts,
    confirmPurchase,
    getUserBalance,
  } = require('../controllers/cartController');

router.post('/users/:userId', addToCart);
router.delete('/users/:userId', removeFromCart);
router.get('/users/:userId', getAllCarts);
router.get('/users/:userId/cart', getCartProducts);
router.get('/getall',getAllProducts)
router.post('/users/:userId/purchase',confirmPurchase);
router.get('/balance/:userId',getUserBalance)
module.exports = router;
