import {
  createEntrypedQuery,
  createEncryptedObject,
  createDecryptedObject,
} from "./utils";
import { decrypt, encrypt, generate } from "./cipher/cipher";
import { PrivateKeyJwk, Data } from "./types";
export {
  PrivateKeyJwk,
  Data,
  HDPath,
  KeyTypes,
  KTY,
  Path,
  CRV,
  X,
  KeyCreateParam,
  KeyCreateParamFromKey,
  PublicKeyJwk,
} from "./types";

export const encryptQuery = (
  query: any,
  privateKeyJwk: PrivateKeyJwk,
  encryptKeys: boolean = true,
  prefix?: string
) => {
  const encryptedQuery = createEntrypedQuery(query, privateKeyJwk, encryptKeys);
  if (prefix) {
    const prefixedEncryptedQuery: any = {};
    Object.keys(encryptedQuery).forEach((key: string) => {
      prefixedEncryptedQuery[`${prefix}.${key}`] = encryptedQuery[key];
    });
    return prefixedEncryptedQuery;
  }
  return encryptedQuery;
};

export const encryptData = (
  data: Data | any,
  privateKeyJwk: PrivateKeyJwk,
  encryptKeys: boolean = true
): any => {
  const type = typeof data;
  if (Array.isArray(data)) {
    return data.map((d: any) => encryptData(d, privateKeyJwk, encryptKeys));
  }

  if (type === "object") {
    const encryptedData = createEncryptedObject(
      data,
      privateKeyJwk,
      encryptKeys
    );
    return encryptedData;
  }
  return encrypt(data, privateKeyJwk as PrivateKeyJwk);
};

export const decryptData = (
  data: Data | any,
  privateKeyJwk: PrivateKeyJwk,
  encryptKeys: boolean = true
): any => {
  const type = typeof data;
  if (Array.isArray(data)) {
    return data.map((d: any) => decryptData(d, privateKeyJwk, encryptKeys));
  }

  if (type === "object") {
    let id;
    if (data._id) {
      id = data._id;
      delete data._id;
    }
    const decryptedData = createDecryptedObject(
      data,
      privateKeyJwk as PrivateKeyJwk,
      encryptKeys
    );
    decryptedData._id = id;
    return decryptedData;
  }
  return decrypt(data, privateKeyJwk as PrivateKeyJwk);
};

export default {
  encryptQuery,
  encryptData,
  decryptData,
  generateEncryptionPrivateKey: generate,
};
