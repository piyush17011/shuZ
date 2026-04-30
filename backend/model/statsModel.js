const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema(
  {
    happyCustomers: {
      type: String,
      default: '+12k',
    },
    pairsShipped: {
      type: String,
      default: '+80k',
    },
    stylesAvailable: {
      type: String,
      default: '+500',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stats', statsSchema);
