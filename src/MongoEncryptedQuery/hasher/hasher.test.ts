import { blindIndexHash, createHashedObject } from ".";

describe("hashing", () => {
  it("can hash with same value and same seed to produce same output", async () => {
    const salt = "123";
    const message = "It’s a dangerous business, Frodo, going out your door.";
    const hashOne = blindIndexHash(message, salt);
    const hashTwo = blindIndexHash(message, salt);
    expect(hashOne === hashTwo).toBe(true);
  });
  it("can hash with same value and different seed to produce differnt output", async () => {
    const saltOne = "123";
    const saltTwo = "456";
    const message = "It’s a dangerous business, Frodo, going out your door.";
    const hashOne = blindIndexHash(message, saltOne);
    const hashTwo = blindIndexHash(message, saltTwo);
    expect(hashOne !== hashTwo).toBe(true);
  });
});

describe("hashing payload to make it seachable", () => {
  it("can hash with same value and different seed to produce different outputs without hashing keys", async () => {
    const objectToHash = {
      id: "urn:uuid:123",
      verifiableCredential: [
        {
          "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://w3id.org/vaccination/v1",
          ],
          type: ["VerifiableCredential", "VaccinationCertificate"],
          id: "urn:uvci:af5vshde843jf831j128fj",
          name: "COVID-19 Vaccination Certificate",
          description: "COVID-19 Vaccination Certificate",
          issuanceDate: "2019-12-03T12:19:52Z",
          issuer: "holder",
          expirationDate: "2029-12-03T12:19:52Z",
          credentialSubject: {
            type: "VaccinationEvent",
            batchNumber: "1183738569",
            administeringCentre: "MoH",
            healthProfessional: "MoH",
            countryOfVaccination: "NZ",
            recipient: {
              type: "VaccineRecipient",
              givenName: "JOHN",
              familyName: "SMITH",
              gender: "Male",
              birthDate: "1958-07-17",
            },
            vaccine: {
              type: "Vaccine",
              disease: "COVID-19",
              atcCode: "J07BX03",
              medicinalProductName: "COVID-19 Vaccine Moderna",
              marketingAuthorizationHolder: "Moderna Biotech",
            },
          },
        },
      ],
    };
    const hashedVersionOne = createHashedObject({ ...objectToHash }, "123");
    const hashedVersionTwo = createHashedObject({ ...objectToHash }, "456");
    const objectOneKeys = Object.keys(hashedVersionOne);
    const objectTwoKeys = Object.keys(hashedVersionTwo);
    expect(objectOneKeys[0] === objectTwoKeys[0]).toBe(true);
    expect(
      hashedVersionOne[objectOneKeys[0]] !== hashedVersionTwo[objectTwoKeys[0]]
    ).toBe(true);
    expect(
      hashedVersionOne[objectOneKeys[1]].length ===
        hashedVersionTwo[objectTwoKeys[1]].length
    ).toBe(true);
  });

  it("can hash with same value and different seed to produce different outputs with hashing keys", async () => {
    const objectToHash = {
      id: "urn:uuid:123",
      verifiableCredential: [
        {
          "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://w3id.org/vaccination/v1",
          ],
          type: ["VerifiableCredential", "VaccinationCertificate"],
          id: "urn:uvci:af5vshde843jf831j128fj",
          name: "COVID-19 Vaccination Certificate",
          description: "COVID-19 Vaccination Certificate",
          issuanceDate: "2019-12-03T12:19:52Z",
          issuer: "holder",
          expirationDate: "2029-12-03T12:19:52Z",
          credentialSubject: {
            type: "VaccinationEvent",
            batchNumber: "1183738569",
            administeringCentre: "MoH",
            healthProfessional: "MoH",
            countryOfVaccination: "NZ",
            recipient: {
              type: "VaccineRecipient",
              givenName: "JOHN",
              familyName: "SMITH",
              gender: "Male",
              birthDate: "1958-07-17",
            },
            vaccine: {
              type: "Vaccine",
              disease: "COVID-19",
              atcCode: "J07BX03",
              medicinalProductName: "COVID-19 Vaccine Moderna",
              marketingAuthorizationHolder: "Moderna Biotech",
            },
          },
        },
      ],
    };
    const hashedVersionOne = createHashedObject(
      { ...objectToHash },
      "123",
      true
    );
    const hashedVersionTwo = createHashedObject(
      { ...objectToHash },
      "456",
      true
    );
    const objectOneKeys = Object.keys(hashedVersionOne);
    const objectTwoKeys = Object.keys(hashedVersionTwo);
    expect(objectOneKeys[0] !== objectTwoKeys[0]).toBe(true);
    expect(
      hashedVersionOne[objectOneKeys[0]] !== hashedVersionTwo[objectTwoKeys[0]]
    ).toBe(true);
    expect(
      hashedVersionOne[objectOneKeys[1]].length ===
        hashedVersionTwo[objectTwoKeys[1]].length
    ).toBe(true);
  });
});
