import "dotenv/config";
import { createHash } from "crypto";

export type ValueToHash = string | any;

const hashKeys = (process.env.HASH_KEYS as string) === "true";

export const hash = (value: ValueToHash) => {
  return createHash("sha256")
    .update(typeof value === "string" ? value : JSON.stringify(value))
    .digest("hex");
};

export const blindIndexHash = (value: ValueToHash, salt: string) => {
  return createHash("sha256")
    .update(typeof value === "string" ? value : JSON.stringify(value))
    .update(createHash("sha256").update(salt, "utf8").digest("hex"))
    .digest("hex");
};

export const hashKey = (key: string, salt: string) => {
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
        .map((value: string) => blindIndexHash(value, salt))
        .join(".");
    } else {
      return blindIndexHash(key, salt);
    }
  }
  return key;
};

const traverseAndHash = (data: any, salt: string): any => {
  if (
    typeof data === "string" ||
    typeof data === "boolean" ||
    typeof data === "number"
  ) {
    return blindIndexHash(data, salt);
  }
  if (Array.isArray(data)) {
    return data.map((d: any) => traverseAndHash(d, salt));
  }
  if (typeof data === "object") {
    const newObject: any = {};
    Object.keys(data).forEach((key: string) => {
      if (hashKeys) {
        const hashedKey = hashKey(key, salt);
        newObject[hashedKey] = traverseAndHash(data[key], salt);
      } else {
        newObject[key] = traverseAndHash(data[key], salt);
      }
    });
    return newObject;
  }
  return data;
};

export const createHashedObject = (data: any, salt: string) => {
  const hashedObject: any = {};
  Object.keys(data).forEach((key: string) => {
    if (hashKeys) {
      const hashedKey = hashKey(key, salt);
      hashedObject[hashedKey] = traverseAndHash(data[key], salt);
    } else {
      hashedObject[key] = traverseAndHash(data[key], salt);
    }
  });
  return hashedObject;
};

export const createHashedQuery = (query: any, salt: string) => {
  const hashedQuery = createHashedObject(query, salt);
  const formattedQuery: any = {};
  Object.keys(hashedQuery).forEach((key) => {
    formattedQuery[
      `${hashKeys ? blindIndexHash("search", salt) : "search"}.${key}`
    ] = hashedQuery[key];
  });
  return formattedQuery;
};
