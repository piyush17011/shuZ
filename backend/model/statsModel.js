const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema(
  {
    happyCustomers: {
      type: String,
      default: '+20',
    },
    pairsShipped: {
      type: String,
      default: '+72',
    },
    stylesAvailable: {
      type: String,
      default: '+25',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stats', statsSchema);
