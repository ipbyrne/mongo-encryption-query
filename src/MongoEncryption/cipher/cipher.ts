import { CompactEncrypt } from "jose/jwe/compact/encrypt";
import { compactDecrypt } from "jose/jwe/compact/decrypt";
import { importJWK } from "jose/key/import";
import { generateKeyPair } from "jose/util/generate_key_pair";
import { exportJWK } from "jose/key/export";
import { PublicKeyJwk, PrivateKeyJwk } from "../../testing/types";

const crvToAlg: { [x: string]: string } = {
  X25519: "ECDH-ES+A256KW",
};

const enc = "A256GCM";

export const generate = async (crv = "X25519") => {
  const alg = crvToAlg[crv];
  const { publicKey, privateKey } = await generateKeyPair(alg, {
    crv,
  });
  const publicKeyJwk = await exportJWK(publicKey);
  const privateKeyJwk = await exportJWK(privateKey);
  return { publicKeyJwk, privateKeyJwk };
};

export const encrypt = async (
  plaintext: Buffer,
  publicKeyJwk: PublicKeyJwk
) => {
  const alg = crvToAlg[publicKeyJwk.crv];
  const key = {
    ...publicKeyJwk,
    alg,
  };
  const jwe = await new CompactEncrypt(Uint8Array.from(plaintext))
    .setProtectedHeader({ alg, enc })
    .encrypt(await importJWK(key));
  return jwe;
};

export const decrypt = async (
  ciphertext: string,
  privateKeyJwk: PrivateKeyJwk
) => {
  const decoder = new TextDecoder();
  const alg = crvToAlg[privateKeyJwk.crv];
  const key = {
    ...privateKeyJwk,
    alg,
  };
  const { plaintext } = await compactDecrypt(ciphertext, await importJWK(key));
  const buffer = Buffer.from(plaintext);
  return JSON.parse(decoder.decode(buffer));
};
