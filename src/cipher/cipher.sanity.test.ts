import { PrivateKeyJwk } from "src/types";
import { generate, encrypt, decrypt } from "./cipher";

describe("X25519", () => {
  it("encrypt and decrypt", async () => {
    const { privateKeyJwk } = await generate();
    const message = {
      message: "It’s a dangerous business, Frodo, going out your door.",
    };
    const jwe = encrypt(message, privateKeyJwk as PrivateKeyJwk);
    const jwe2 = encrypt(message, privateKeyJwk as PrivateKeyJwk);
    expect(jwe).toStrictEqual(jwe2);
    const decryptedData = decrypt(jwe, privateKeyJwk as PrivateKeyJwk);
    expect(decryptedData).toStrictEqual(message);
  });
});
