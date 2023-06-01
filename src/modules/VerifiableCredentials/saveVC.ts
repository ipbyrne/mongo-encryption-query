import "dotenv/config";
import { connect, disconnect } from "../database";
import { publicKeyJwk } from "../keys";
import MongoEncryption from '../MongoEncryption';
import { PublicKeyJwk } from "../types";

export const saveVC = async (
  verifiableCredential: any,
  salt: string = process.env.SALT as string
) => {
  const connection = await connect();
  const VerifiableCredentials = connection.collection("verifiable-credentials");
  const data = await MongoEncryption.encryptData(verifiableCredential, publicKeyJwk as PublicKeyJwk, salt)
  const result = await VerifiableCredentials.insertOne(data);
  await disconnect();
  return result;
};
