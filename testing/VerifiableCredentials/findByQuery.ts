import "dotenv/config";
import { connect, disconnect } from "../database";
import MongoEncryption from "../../src";
import { privateKeyJwk } from "../keys";
import { PrivateKeyJwk } from "../../src/types";

export const findByQuery = async (query: any): Promise<any[] | null> => {
  const connection = await connect();
  const VerifiableCredentials = connection.collection("verifiable-credentials");
  const encryptedQuery = MongoEncryption.encryptQuery(
    query,
    privateKeyJwk as PrivateKeyJwk
  );
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
        privateKeyJwk as PrivateKeyJwk
      );
      returnData.push(decryptedVc);
    } catch (ex) {}
  }
  await disconnect();
  return returnData;
};
