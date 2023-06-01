import { createHashedQuery, createHashedObject } from "./hasher";
import { encrypt, decrypt } from "./cipher/cipher";
import { PrivateKeyJwk, PublicKeyJwk } from "../types";

export const encryptQuery = (query: any, salt: string) => {
    const hashedQuery = createHashedQuery(query, salt);
    return hashedQuery
}

export const encryptData = async (data: any, publicKeyJwk: PublicKeyJwk,  salt: string) => {
    const hashedData = createHashedObject(data, salt, true);
    const encoder = new TextEncoder();
    const cipher = await encrypt(
      Buffer.from(encoder.encode(JSON.stringify(data))),
      publicKeyJwk as PublicKeyJwk
    );
    return {
        cipher,
        search: hashedData
    }
}

export const decryptData = async (cipher: string, privateKeyJwk: PrivateKeyJwk) => {
    const decryptedData = await decrypt(
        cipher,
        privateKeyJwk as PrivateKeyJwk
    );
    return decryptedData
}

export default {
    encryptQuery,
    encryptData,
    decryptData
}