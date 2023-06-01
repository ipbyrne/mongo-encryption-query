import { generate, encrypt, decrypt } from "./cipher";
import { PublicKeyJwk, PrivateKeyJwk } from "../../types";

describe("X25519", () => {
  it("encrypt and decrypt", async () => {
    const { publicKeyJwk, privateKeyJwk } = await generate();
    const encoder = new TextEncoder();
    const message = {
      message: "It’s a dangerous business, Frodo, going out your door.",
    };
    const jwe = await encrypt(
      Buffer.from(encoder.encode(JSON.stringify(message))),
      publicKeyJwk as PublicKeyJwk
    );
    const decryptedData = await decrypt(jwe, privateKeyJwk as PrivateKeyJwk);
    expect(decryptedData).toStrictEqual(message);
  });
});
