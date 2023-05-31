import { saveVC } from "./saveVC";
import { findByQuery } from "./findByQuery";
import { resetDatabase } from "../database";

beforeAll(async () => {
  await resetDatabase();
});

describe("Can save and search encrypted data", () => {
  describe("create", () => {
    it("should save VCs", async () => {
      await saveVC({
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/traceability/v1",
        ],
        type: ["VerifiableCredential", "MillTestReport"],
        issuanceDate: "2018-02-24T05:28:04Z",
        credentialSubject: { id: "did:example:234" },
        name: "Test 1",
        description: "Example Credential 1",
        issuer: {
          id: "did:web:example.com",
        },
        id: "urn:uuid:e22ccc92-2c81-411f-a80f-e7f8334000a7",
      });

      await saveVC({
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/traceability/v1",
        ],
        type: ["VerifiableCredential"],
        name: "Test 2",
        description: "Example Credential 2",
        issuanceDate: "2018-02-24T05:28:04Z",
        credentialSubject: {
          id: "did:example:234",
          nestedArrayData: [
            {
              index: 3,
            },
            {
              index: 4,
            },
          ],
        },
        issuer: {
          id: "did:web:example.com",
        },
        id: "urn:uuid:e22ccc92-2c81-411f-a80f-e7f8334000a7",
      });

      await saveVC({
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/traceability/v1",
        ],
        type: ["VerifiableCredential"],
        name: "Test 3",
        description: "Example Credential 3",
        issuanceDate: "2018-02-24T05:28:04Z",
        credentialSubject: {
          id: "did:example:234",
          address: {
            zipCode: "77379",
          },
          nestedArrayData: [
            {
              index: 1,
            },
            {
              index: 2,
            },
          ],
        },
        issuer: {
          id: "did:web:example.com",
        },
        id: "urn:uuid:e22ccc92-2c81-411f-a80f-e7f8334000a7",
      });

      await saveVC({
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/traceability/v1",
        ],
        type: ["VerifiableCredential"],
        name: "Test 3",
        description: "Example Credential 3",
        issuanceDate: "2018-02-24T05:28:04Z",
        credentialSubject: {
          id: "did:example:234",
          address: {
            zipCode: "77379",
          },
          nestedArrayData: [
            {
              index: 5,
            },
            {
              index: 6,
            },
            {
              index: 7,
            },
          ],
        },
        issuer: {
          id: "did:web:example.com",
        },
        id: "urn:uuid:e22ccc92-2c81-411f-a80f-e7f8334000a7",
      });
    });

    it("should be able to query VC data by type $in query with hashed query", async () => {
      const results = (await findByQuery({
        type: {
          $in: ["MillTestReport"],
        },
      })) as any[];
      expect(results[0].type[1]).toBe("MillTestReport");
    });

    it("should be able to query VC by nested attributes", async () => {
      const results = (await findByQuery({
        "credentialSubject.address.zipCode": "77379",
      })) as any[];
      expect(results[0].credentialSubject.address.zipCode).toBe("77379");
    });

    it("should be able to query VC by nested array attributes", async () => {
      const results = (await findByQuery({
        "credentialSubject.nestedArrayData.index": 1,
      })) as any[];
      expect(results[0].credentialSubject.nestedArrayData[0].index).toBe(1);
    });

    it("should be able to query VC by nested array attributes with $in", async () => {
      const results = (await findByQuery({
        "credentialSubject.nestedArrayData.index": {
          $in: [1, 3],
        },
      })) as any[];
      expect(results[0].credentialSubject.nestedArrayData[0].index).toBe(3);
      expect(results[1].credentialSubject.nestedArrayData[0].index).toBe(1);
    });
  });
});
