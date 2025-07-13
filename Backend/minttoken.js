/** @format */

/** @format */

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  clusterApiUrl, // ✅ FIXED HERE
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  createMintToInstruction,
} from "@solana/spl-token";
import fs from "fs";

// 🔐 Load secret key
const secretKey = JSON.parse(fs.readFileSync("./wallet.json", "utf-8"));
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));

// 🔗 Connection
const connection = new Connection(clusterApiUrl("devnet"), "finalized");

// 💸 Airdrop check
const ensureSolBalance = async () => {
  const balance = await connection.getBalance(payer.publicKey);
  console.log(`🔍 SOL Balance: ${balance / LAMPORTS_PER_SOL} SOL`);

  if (balance < 0.01 * LAMPORTS_PER_SOL) {
    console.log("⚠️ Airdropping SOL...");
    const sig = await connection.requestAirdrop(
      payer.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");

    await connection.confirmTransaction(
      { signature: sig, blockhash, lastValidBlockHeight },
      "confirmed"
    );
    console.log("✅ Airdrop complete");
  }
};

const main = async () => {
  try {
    console.log("🚀 Connecting...");
    const version = await connection.getVersion();
    console.log("🔗 Connected:", version);

    await ensureSolBalance();

    // ✅ Create Mint
    const mint = await createMint(connection, payer, payer.publicKey, null, 9);
    console.log("✅ Mint:", mint.toBase58());

    // ✅ Create Token Account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );
    console.log("📦 Token Account:", tokenAccount.address.toBase58());

    // ✅ Instruction
    const mintAmount = 1_000_000_000; // 1 token
    const instruction = createMintToInstruction(
      mint,
      tokenAccount.address,
      payer.publicKey,
      mintAmount
    );

    // ✅ Create fresh blockhash right before sending
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("finalized");

    const transaction = new Transaction({
      feePayer: payer.publicKey,
      recentBlockhash: blockhash,
    }).add(instruction);

    transaction.sign(payer);

    const rawTx = transaction.serialize();

    // ⏱️ Send immediately
    const signature = await connection.sendRawTransaction(rawTx, {
      skipPreflight: false,
    });
    await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "finalized"
    );

    // ✅ Confirm right away using same blockhash
    const confirmation = await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    console.log(`🎉 Minted ${mintAmount / 1e9} tokens`);
    console.log(`🔑 Tx Signature: ${signature}`);
    console.log("✅ Confirmation status:", confirmation.value);
  } catch (err) {
    console.error("❌ Minting failed:", err.message || err);
  }
};

main();
