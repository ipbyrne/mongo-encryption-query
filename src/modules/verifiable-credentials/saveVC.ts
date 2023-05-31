import "dotenv/config";
import { connect, disconnect } from "../database";
import { createHashedObject } from "../hasher";
import { encrypt } from "../cipher/cipher";
import { publicKeyJwk } from "../keys";
import { PublicKeyJwk } from "../types";

export const saveVC = async (
  verifiableCredential: any,
  salt: string = process.env.SALT as string
) => {
  const connection = await connect();
  const VerifiableCredentials = connection.collection("verifiable-credentials");
  const hashedData = createHashedObject(verifiableCredential, salt, true);
  const encoder = new TextEncoder();
  const cipher = await encrypt(
    Buffer.from(encoder.encode(JSON.stringify(verifiableCredential))),
    publicKeyJwk as PublicKeyJwk
  );
  const result = await VerifiableCredentials.insertOne({
    searchableData: hashedData,
    cipher,
  });
  await disconnect();
  return result;
};
