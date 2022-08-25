import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    orderItem: [
      {
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],

    shippingAddress: {
      address: {type: String, required: true},
      city: {type: String, required: true},
      postalCode: {type: String, required: true},
      country: {type: String, required: true},
    },

    payment: {
      type: String,
      required: true,
    },

    paymentResult: {
      id: {type: String, required: true},
      status: {type: String, required: true},
      updateTime: {type: String, required: true},
    },

    description: {
      type: String,
      required: true,
    },

    reviews: [reviewSchema],

    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
