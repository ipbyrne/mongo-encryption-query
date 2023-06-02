import {
  createHashedQuery,
  createHashedObject,
  blindIndexHash,
} from "./hasher";
import { encrypt, decrypt } from "./cipher/cipher";
import { PrivateKeyJwk, PublicKeyJwk } from "../testing/types";

export const encryptQuery = (query: any, salt: string) => {
  const hashedQuery = createHashedQuery(query, salt);
  return hashedQuery;
};

export const encryptData = async (
  data: any,
  publicKeyJwk: PublicKeyJwk,
  salt: string
) => {
  const hashedData = createHashedObject(data, salt, true);
  const encoder = new TextEncoder();
  const cipher = await encrypt(
    Buffer.from(encoder.encode(JSON.stringify(data))),
    publicKeyJwk as PublicKeyJwk
  );
  return {
    [`${blindIndexHash("cipher", salt)}`]: cipher,
    [`${blindIndexHash("search", salt)}`]: hashedData,
  };
};

export const decryptData = async (
  data: any,
  privateKeyJwk: PrivateKeyJwk,
  salt: string
) => {
  const decryptedData = await decrypt(
    data[`${blindIndexHash("cipher", salt)}`],
    privateKeyJwk as PrivateKeyJwk
  );
  return decryptedData;
};

export default {
  encryptQuery,
  encryptData,
  decryptData,
};
