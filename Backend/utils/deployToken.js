/** @format */

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  createMintToInstruction,
} from "@solana/spl-token";
import fs from "fs";

// Load secret key
const secretKey = JSON.parse(fs.readFileSync("./wallet.json", "utf-8"));
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));

const connection = new Connection(
  "https://solana-devnet.g.alchemy.com/v2/1OntyTonzUHm2Rm2F7pS6zjTaYD6BpYQ",
  "confirmed"
);

const deployToken = async ({ decimals, amount }) => {
  // ✅ Create mint
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    decimals
  );

  // ✅ Create token account
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  // ✅ Mint tokens
  const mintAmount = amount * 10 ** decimals;
  const instruction = createMintToInstruction(
    mint,
    tokenAccount.address,
    payer.publicKey,
    mintAmount
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("finalized");
  const transaction = new Transaction({
    feePayer: payer.publicKey,
    recentBlockhash: blockhash,
  });
  transaction.add(instruction);
  transaction.sign(payer);

  const txId = await connection.sendRawTransaction(transaction.serialize());
  await connection.confirmTransaction(
    { signature: txId, blockhash, lastValidBlockHeight },
    "finalized"
  );

  return {
    mintAddress: mint.toBase58(),
    tokenAccount: tokenAccount.address.toBase58(),
    txId,
  };
};

export default deployToken;
