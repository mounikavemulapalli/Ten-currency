/** @format */

// utils/solanaUtils.js
import {
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  createMintToInstruction,
} from "@solana/spl-token";
import fs from "fs";

// Load secret key
const secret = JSON.parse(fs.readFileSync("./wallet.json", "utf-8"));
const payer = Keypair.fromSecretKey(Uint8Array.from(secret));

// Create connection
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export const deployToken = async ({ decimals = 9, amount = 1_000_000_000 }) => {
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    decimals
  );
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  const mintInstruction = createMintToInstruction(
    mint,
    tokenAccount.address,
    payer.publicKey,
    amount
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  const tx = new Transaction({
    recentBlockhash: blockhash,
    feePayer: payer.publicKey,
  }).add(mintInstruction);

  tx.sign(payer);

  const txId = await connection.sendRawTransaction(tx.serialize());
  await connection.confirmTransaction({
    signature: txId,
    blockhash,
    lastValidBlockHeight,
  });

  return {
    mintAddress: mint.toBase58(),
    txId,
    tokenAccount: tokenAccount.address.toBase58(),
  };
};
