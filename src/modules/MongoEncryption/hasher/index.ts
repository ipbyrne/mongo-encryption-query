import { createHash } from "crypto";

export type ValueToHash = string | any;

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
    "$size",
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

const traverseAndHash = (
  data: any,
  salt: string,
  hashKeys: boolean = false
): any => {
  if (
    typeof data === "string" ||
    typeof data === "boolean" ||
    typeof data === "number"
  ) {
    return blindIndexHash(data, salt);
  }
  if (Array.isArray(data)) {
    return data.map((d: any) => traverseAndHash(d, salt, hashKeys));
  }
  if (typeof data === "object") {
    const newObject: any = {};
    Object.keys(data).forEach((key: string) => {
      if (hashKeys) {
        const hashedKey = hashKey(key, salt);
        newObject[hashedKey] = traverseAndHash(data[key], salt, hashKeys);
      } else {
        newObject[key] = traverseAndHash(data[key], salt, hashKeys);
      }
    });
    return newObject;
  }
  return data;
};

export const createHashedObject = (
  data: any,
  salt: string,
  hashKeys: boolean = false
) => {
  const hashedObject: any = {};
  Object.keys(data).forEach((key: string) => {
    if (hashKeys) {
      const hashedKey = hashKey(key, salt);
      hashedObject[hashedKey] = traverseAndHash(data[key], salt, hashKeys);
    } else {
      hashedObject[key] = traverseAndHash(data[key], salt, hashKeys);
    }
  });
  return hashedObject;
};

export const createHashedQuery = (query: any, organizationId: string) => {
  const hashedQuery = createHashedObject(query, organizationId, true);
  const formattedQuery: any = {};
  Object.keys(hashedQuery).forEach((key) => {
    formattedQuery[`search.${key}`] = hashedQuery[key];
  });
  return formattedQuery;
};
