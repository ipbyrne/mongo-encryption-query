import "dotenv/config";
import { connect, disconnect } from "../database";
import { privateKeyJwk } from "../keys";
import MongoEncryption from "../..";
import { PrivateKeyJwk } from "../../types";

export const saveVC = async (
  verifiableCredential: any,
  usePrefix: boolean = false
) => {
  const connection = await connect();
  const VerifiableCredentials = connection.collection("verifiable-credentials");
  const data = await MongoEncryption.encryptData(
    verifiableCredential,
    privateKeyJwk as PrivateKeyJwk
  );
  const result = usePrefix
    ? await VerifiableCredentials.insertOne({ data })
    : await VerifiableCredentials.insertOne(data);
  await disconnect();
  return result;
};
