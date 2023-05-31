import "dotenv/config";
import { connect, disconnect } from "../database";
import { createHashedQuery } from "../hasher";
import { decrypt } from "../cipher/cipher";
import { privateKeyJwk } from "../keys";
import { PrivateKeyJwk } from "../types";

export const findByQuery = async (
  query: any,
  salt: string = process.env.SALT as string
): Promise<any[] | null> => {
  const connection = await connect();
  const VerifiableCredentials = connection.collection("verifiable-credentials");
  const hashedQuery = createHashedQuery(query, salt);
  const credentials = await VerifiableCredentials.find(hashedQuery).toArray();
  if (!credentials) return null;
  const returnData: any[] = [];
  for (let i = 0; i < credentials.length; i += 1) {
    try {
      const cred = credentials[i];

      const decryptedVc = await decrypt(
        cred.cipher,
        privateKeyJwk as PrivateKeyJwk
      );
      returnData.push(decryptedVc);
    } catch (ex) {}
  }
  await disconnect();
  return returnData;
};
