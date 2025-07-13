/** @format */

// /** @format */

// import mongoose from "mongoose";

// const walletSchema = new mongoose.Schema({
//   address: String,
//   balance: {
//     type: Number,
//     default: 1000, // give initial balance
//   },
// });

// export default mongoose.model("Wallet", walletSchema);
/** @format */
import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  ethBalance: {
    type: Number,
    default: 10, // initial ETH balance
  },
  tokens: [
    {
      tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Token",
      },
      amount: {
        type: Number,
        default: 10,
      },
    },
  ],
});

export default mongoose.model("Wallet", walletSchema);
