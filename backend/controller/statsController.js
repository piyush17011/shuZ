const Order = require('../model/orderModel');
const Product = require('../model/productModel');

const formatNumber = (num) => {
  if (num >= 1000) {
    return '+' + (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return '+' + num;
};

const getStats = async (req, res) => {
  try {
    // 1. Count happy customers (unique users who placed orders)
    const happyCustomersCount = await Order.distinct('userId').then(ids => ids.length);
    const happyCustomers = formatNumber(happyCustomersCount);

    // 2. Count pairs shipped (sum of all quantities in all orders)
    const pairsShippedAgg = await Order.aggregate([
      { $unwind: '$orderItems' },
      { $group: { _id: null, totalQuantity: { $sum: '$orderItems.quantity' } } }
    ]);
    const pairsShipped = formatNumber(pairsShippedAgg[0]?.totalQuantity || 0);

    // 3. Count styles available (total unique products)
    const stylesAvailableCount = await Product.countDocuments();
    const stylesAvailable = formatNumber(stylesAvailableCount);

    res.status(200).json({
      happyCustomers,
      pairsShipped,
      stylesAvailable,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Failed to fetch stats', error });
  }
};

module.exports = {
  getStats,
};
