/** @format */

import Transaction from "../models/Transaction.js";
import { AptosAccount, AptosClient, HexString } from "aptos";
import dotenv from "dotenv";
dotenv.config();

const aptosClient = new AptosClient(process.env.APTOS_NODE);

function toU64(value) {
  return BigInt(Math.floor(Number(value))).toString(); // no decimals for integer coin
}

// POST /api/txn/send
// export const sendCurrency = async (req, res) => {
//   try {
//     const { fromAddress, privateKey, toAddress, amount } = req.body;

//     if (!fromAddress || !privateKey || !toAddress || !amount) {
//       return res.status(400).json({ msg: "Missing required fields" });
//     }

//     const sender = new AptosAccount(
//       HexString.ensure(privateKey).toUint8Array()
//     );

//     const payload = {
//       type: "entry_function_payload",
//       function: "0x1::coin::transfer",
//       type_arguments: ["0x1::aptos_coin::AptosCoin"],
//       arguments: [toAddress, toU64(amount)],
//     };

//     const txnRequest = await aptosClient.generateTransaction(
//       sender.address(),
//       payload
//     );
//     const signedTxn = await aptosClient.signTransaction(sender, txnRequest);
//     const txnResponse = await aptosClient.submitTransaction(signedTxn);
//     await aptosClient.waitForTransaction(txnResponse.hash);

//     // Save transaction to MongoDB
//     const savedTxn = await Transaction.create({
//       from: fromAddress,
//       to: toAddress,
//       amount,
//       hash: txnResponse.hash,
//     });

//     console.log("✅ Transaction saved to DB:", savedTxn);

//     res.json({
//       msg: "Transfer successful",
//       hash: txnResponse.hash,
//       txn: savedTxn,
//     });
//   } catch (err) {
//     console.error("❌ Error sending currency:", err);
//     res
//       .status(500)
//       .json({ msg: "Failed to send currency", error: err.message });
//   }
// };

export const sendCurrency = async (req, res) => {
  try {
    const {
      fromAddress: rawFrom,
      privateKey: rawKey,
      toAddress: rawTo,
      amount,
    } = req.body;

    const fromAddress = rawFrom?.trim();
    const toAddress = rawTo?.trim();
    const privateKey = rawKey?.trim();

    if (!fromAddress || !privateKey || !toAddress || !amount) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const sanitizedKey = privateKey.startsWith("0x")
      ? privateKey.slice(2)
      : privateKey;

    if (!/^[0-9a-fA-F]{128}$/.test(sanitizedKey)) {
      return res.status(400).json({ msg: "Invalid private key format" });
    }

    if (!/^0x[0-9a-fA-F]{64}$/.test(toAddress)) {
      return res.status(400).json({ msg: "Invalid recipient address format" });
    }

    const sender = new AptosAccount(
      Uint8Array.from(Buffer.from(sanitizedKey, "hex"))
    );

    const payload = {
      type: "entry_function_payload",
      function: "0x1::coin::transfer",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
      arguments: [toAddress, toU64(amount)],
    };

    const txnRequest = await aptosClient.generateTransaction(
      sender.address(),
      payload
    );
    const signedTxn = await aptosClient.signTransaction(sender, txnRequest);
    const txnResponse = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(txnResponse.hash);

    // Save to DB
    const savedTxn = await Transaction.create({
      from: fromAddress,
      to: toAddress,
      amount,
      hash: txnResponse.hash,
    });

    console.log("✅ Saved transaction:", savedTxn);

    res.json({
      msg: "Transfer successful",
      hash: txnResponse.hash,
      txn: savedTxn,
    });
  } catch (err) {
    console.error("❌ Error sending currency:", err);
    res
      .status(500)
      .json({ msg: "Failed to send currency", error: err.message });
  }
};

// GET /api/txn/:address
export const getTxns = async (req, res) => {
  try {
    const address = req.params.address;

    const txns = await Transaction.find({
      $or: [{ from: address }, { to: address }],
    }).sort({ createdAt: -1 });

    console.log("📦 Transactions fetched:", txns);

    res.json(txns);
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
    res
      .status(500)
      .json({ msg: "Failed to fetch transactions", error: err.message });
  }
};
