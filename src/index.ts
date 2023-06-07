import {
  createEntrypedQuery,
  createEncryptedObject,
  createDecryptedObject,
} from "./utils";
import { generate } from "./cipher/cipher";
import { PrivateKeyJwk, Data } from "./types";
import * as Types from "./types";

export const encryptQuery = (query: any, privateKeyJwk: PrivateKeyJwk) => {
  const hashedQuery = createEntrypedQuery(query, privateKeyJwk);
  return hashedQuery;
};

export const encryptData = (data: Data, privateKeyJwk: PrivateKeyJwk) => {
  const encryptedData = createEncryptedObject(data, privateKeyJwk);
  return encryptedData;
};

export const decryptData = (data: Data, privateKeyJwk: PrivateKeyJwk) => {
  let id;
  if (data._id) {
    id = data._id;
    delete data._id;
  }
  const decryptedData = createDecryptedObject(
    data,
    privateKeyJwk as PrivateKeyJwk
  );
  decryptedData._id = id;
  return decryptedData;
};

export default {
  encryptQuery,
  encryptData,
  decryptData,
  generateEncryptionKeyPair: generate,
  Types,
};
