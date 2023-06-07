import "dotenv/config";
import { decrypt, encrypt } from "../cipher/cipher";
import { PrivateKeyJwk } from "src/types";

export type ValueToHash = string | any;

const encryptKeys = (process.env.ENCRYPT_KEYS as string) === "true";

export const encryptKey = (key: string, privateKeyJwk: PrivateKeyJwk) => {
  // Supported MongoDB Equality Queries
  const exlcudedKeysForQueries = [
    "$eq",
    "$ne",
    "$in",
    "$nin",
    "$and",
    "$or",
    "$not",
    "$nor",
    "$expr",
  ];
  if (!exlcudedKeysForQueries.includes(key)) {
    if (key.indexOf(".") >= 0) {
      return key
        .split(".")
        .map((value: string) => encrypt(value, privateKeyJwk))
        .join(".");
    } else {
      return encrypt(key, privateKeyJwk);
    }
  }
  return key;
};

const traverseAndEncrypt = (data: any, privateKeyJwk: PrivateKeyJwk): any => {
  if (
    typeof data === "string" ||
    typeof data === "boolean" ||
    typeof data === "number"
  ) {
    return encrypt(data, privateKeyJwk);
  }
  if (Array.isArray(data)) {
    return data.map((d: any) => traverseAndEncrypt(d, privateKeyJwk));
  }
  if (typeof data === "object") {
    const newObject: any = {};
    Object.keys(data).forEach((key: string) => {
      if (encryptKeys) {
        const encryptedKey = encryptKey(key, privateKeyJwk);
        newObject[encryptedKey] = traverseAndEncrypt(data[key], privateKeyJwk);
      } else {
        newObject[key] = traverseAndEncrypt(data[key], privateKeyJwk);
      }
    });
    return newObject;
  }
  return data;
};

export const createEncryptedObject = (
  data: any,
  privateKeyJwk: PrivateKeyJwk
) => {
  const hashedObject: any = {};
  Object.keys(data).forEach((key: string) => {
    if (encryptKeys) {
      const encryptedKey = encryptKey(key, privateKeyJwk);
      hashedObject[encryptedKey] = traverseAndEncrypt(data[key], privateKeyJwk);
    } else {
      hashedObject[key] = traverseAndEncrypt(data[key], privateKeyJwk);
    }
  });
  return hashedObject;
};

const traverseAndDecrypt = (data: any, privateKeyJwk: PrivateKeyJwk): any => {
  if (
    typeof data === "string" ||
    typeof data === "boolean" ||
    typeof data === "number"
  ) {
    return decrypt(data as string, privateKeyJwk);
  }
  if (Array.isArray(data)) {
    return data.map((d: any) => traverseAndDecrypt(d, privateKeyJwk));
  }
  if (typeof data === "object") {
    const newObject: any = {};
    Object.keys(data).forEach((key: string) => {
      if (encryptKeys) {
        const decryptedKey = decrypt(key, privateKeyJwk);
        newObject[decryptedKey] = traverseAndDecrypt(data[key], privateKeyJwk);
      } else {
        newObject[key] = traverseAndDecrypt(data[key], privateKeyJwk);
      }
    });
    return newObject;
  }
  return data;
};

export const createDecryptedObject = (
  data: any,
  privateKeyJwk: PrivateKeyJwk
) => {
  const decryptedObject: any = {};
  Object.keys(data).forEach((key: string) => {
    if (encryptKeys) {
      const decryptedKey = decrypt(key, privateKeyJwk);
      decryptedObject[decryptedKey] = traverseAndDecrypt(
        data[key],
        privateKeyJwk
      );
    } else {
      decryptedObject[key] = traverseAndDecrypt(data[key], privateKeyJwk);
    }
  });
  return decryptedObject;
};

export const createEntrypedQuery = (
  query: any,
  privateKeyJwk: PrivateKeyJwk
) => {
  const encryptedQuery = createEncryptedObject(query, privateKeyJwk);
  return encryptedQuery;
};
