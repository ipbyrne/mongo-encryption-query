# Mongo Encryption Query

This is a simple implementation of storing encrypted data in mongo db is this searchable with all equality operators out of the box.

## To Use

To run the test to see how this works in practice you can run:
```
npm install
npm run test
```

Out of the box, this will support all MongoDB equality query operators.

## How Data is Stored

Once data is added to the DB this will be it's shape:
```
{
    _id: 6477c90c035404f0de40e5f8,
    searchableData: {
        '7a85fcba9eadcf8ccb29af78a06e5b9beb17bc1f4c860d4a4ecf2dfeca447ffa': [Array],
        f9008bb76a0e1523b236430a9561087e8995b36d3825b0a17627f7cc9170706a: [Array],
        '5f7af41d38929438da3be3d0bca2c5ee99acfd0b93fa5d02f625a37609aaefe4': '60e0cca1017ce224253f703c36ca0584a40e3a9b229f11f4e5842a9e4ab9cff9',
        '6ef91db0f6dada1c87473fe9c5a34c2b07cd16de564d17615c53f9f8b06fb066': '9526f9adfcf0a16fcbcc74d676e523a247a3fcdc7b7c0120d0a67765e7be61e2',
        f02e12dde03990ea2d1335b1b68644332ecb1ba6cffa24ba3df823027d770fea: '2f5c3b84ab871ae0cf0876fd4357bafa9b6f548d252f8f553138bbf6dc0ee7d9',
        '262ccd808d4554b91d2ca20fea330879fc594d281619e5b267296fb2b1e5267f': [Object],
        '197b9fa9a4000d7b22ae435f3086966935c68d1f8ded0a9de12b6cab02657e92': [Object],
        '4a0bbb40bfe0e6615b3d8f52c105f80daec2aeb5c3794bfdefe06b256ce4594b': '497c3876dfedb54c3e94aaf803480948380f155d09b1d0eb2121d3b80d7cb53b'
    },
    cipher: 'eyJhbGciOiJFQ0RILUVTK0EyNTZLVyIsImVuYyI6IkEyNTZHQ00iLCJlcGsiOnsieCI6Imc4eG4xNy12N1NoTzVTY0VNX3FhcWxwVDhDZk9HVlpKVXVvTVVOWDRabnciLCJjcnYiOiJYMjU1MTkiLCJrdHkiOiJPS1AifX0.SF7Hlt-LmtoC9UCPk5mMPg0zwm60-6QWNg0amZJzMTkKfwg8RsZb7g.sNM4pZlfuOK9LcjL.OQUwXaXlDzIkUPHCOsOi7_lrA2uff3wN1IZMoK3Wp_ByKC_Hd_Nh0HD3ZChZ9jqzHoJ_4rafQXj0t6wLVl_OiSm8mR55Z5FHGHMCFd5Y8abilfd1aG_jIPtZkRGyYuMGvE6_pAFSLOLDQ5CHx-PlKi4rhOgyiiBPC11aIQTjPSe_ok-8nhYIsyMLBGvAxHiCFpj4pH_SLQssksLH2G4cg1ZRutfgVuzxwevJ65qfay5ftJNyWoV43qrYxK6PzE2qFaI7yAdIPneL10wG0wwvNoM7ohGAh0z2RW0WXVdxU8jwIFI6P7nOWmP6cX_4kaHEHhMPQsUwz82QGPsaR_4MAECmkFxRGEVpWwCwH5mqvERWlahvU4F1RzcQPngQD-ixQz4YMe0xSaJYWRocbSXyndIIXWlSdE-X50Nx9V5NasecFNECqExkfFmGMtDo8pAsWJ-XpS3i68pQnFvw72MqiMpt3wrWB47yARSE-0uRgeCZg-wTGW51ENVldk9OZUAJFHN7RIst3ZeP.nGz0lXPWEKJf7GfzvephAg'
}
```

The `cipher` key contains the probablistic encryption of the actual data. The `searchable` data contains the determinate hashing of the data's key value pairs. 

In practice, each user or organization should use their own salt value so no people will have matching hashes even if they are using the same values. This could be the thumbprint of the key the user or organization is going to use to encrypt/decrypt the data.
