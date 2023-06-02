import {
  createHashedQuery,
  createHashedObject,
  blindIndexHash,
} from "./hasher";
import { encrypt, decrypt, generate } from "./cipher/cipher";
import { PrivateKeyJwk, PublicKeyJwk } from "./types";
import * as Types from "./types";

const hashKeys = (process.env.HASH_KEYS as string) === "true";

export const encryptQuery = (query: any, salt: string) => {
  const hashedQuery = createHashedQuery(query, salt);
  return hashedQuery;
};

export const encryptData = async (
  data: any,
  publicKeyJwk: PublicKeyJwk,
  salt: string
) => {
  const hashedData = createHashedObject(data, salt);
  const encoder = new TextEncoder();
  const cipher = await encrypt(
    Buffer.from(encoder.encode(JSON.stringify(data))),
    publicKeyJwk as PublicKeyJwk
  );
  return {
    [hashKeys ? `${blindIndexHash("cipher", salt)}` : "cipher"]: cipher,
    [hashKeys ? `${blindIndexHash("search", salt)}` : "search"]: hashedData,
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
  generateEncryptionKeyPair: generate,
  Types,
};
