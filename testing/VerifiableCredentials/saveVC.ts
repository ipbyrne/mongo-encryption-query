import "dotenv/config";
import { connect, disconnect } from "../database";
import { privateKeyJwk } from "../keys";
import MongoEncryption from "../../src";
import { PrivateKeyJwk } from "../../src/types";

export const saveVC = async (verifiableCredential: any) => {
  const connection = await connect();
  const VerifiableCredentials = connection.collection("verifiable-credentials");
  const data = await MongoEncryption.encryptData(
    verifiableCredential,
    privateKeyJwk as PrivateKeyJwk
  );
  const result = await VerifiableCredentials.insertOne(data);
  await disconnect();
  return result;
};
