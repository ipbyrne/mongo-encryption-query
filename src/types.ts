export type HDPath = string;

export enum KeyTypes {
  ED25519 = "Ed25519",
  X25519 = "X25519",
  SECP256K1 = "secp256k1", // used for bitcoin
  P256 = "P-256", // used for NIST curve
}

export interface KTY {
  kty: string;
}

export interface Path {
  path: HDPath;
}

export interface CRV {
  crv: KeyTypes;
}

export interface X {
  x: string;
}

export interface KeyCreateParam extends Path, CRV {}
export interface KeyCreateParamFromKey {
  keyId: string;
}

export interface PublicKeyJwk extends KTY, CRV, X {}

export interface PrivateKeyJwk extends KTY, CRV, X {
  d: string;
}

export interface Data {
  [key: string]: any;
}
