import "dotenv/config";
import { connect, disconnect } from "../database";
import MongoEncryption from "../../MongoEncryption";
import { privateKeyJwk } from "../keys";
import { PrivateKeyJwk } from "../types";

export const findByQuery = async (
  query: any,
  salt: string = process.env.SALT as string
): Promise<any[] | null> => {
  const connection = await connect();
  const VerifiableCredentials = connection.collection("verifiable-credentials");
  const encryptedQuery = MongoEncryption.encryptQuery(query, salt);
  const credentials = await VerifiableCredentials.find(
    encryptedQuery
  ).toArray();
  if (!credentials) return null;
  const returnData: any[] = [];
  for (let i = 0; i < credentials.length; i += 1) {
    try {
      const cred = credentials[i];
      const decryptedVc = await MongoEncryption.decryptData(
        cred,
        privateKeyJwk as PrivateKeyJwk,
        salt
      );
      returnData.push(decryptedVc);
    } catch (ex) {}
  }
  await disconnect();
  return returnData;
};
