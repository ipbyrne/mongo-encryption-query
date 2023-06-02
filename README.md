# Mongo Encrypted Query
[![CI](https://github.com/ipbyrne/mongo-encrypted-query/actions/workflows/ci.yml/badge.svg)](https://github.com/ipbyrne/mongo-encrypted-query/actions/workflows/ci.yml)
![Branches](./coverage/badge-branches.svg)
![Functions](./coverage/badge-functions.svg)
![Lines](./coverage/badge-lines.svg)
![Statements](./coverage/badge-statements.svg)
[![NPM](https://nodei.co/npm/@ipbyrne/mongo-encrypted-query.png?mini=true)](https://npmjs.org/package/@ipbyrne/mongo-encrypted-query)

This is a simple SDK that can be used to encrypt all of your data in MongoDB in a way that makes it searchable with any MongoDB equality operator.

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
  "_id": "647a0c77d10ce31ab5a43104",
  "0e84bb54f767306135740202fcdb538372e04fd2fd28b9321243073d3eb9b6e4": "eyJhbGciOiJFQ0RILUVTK0EyNTZLVyIsImVuYyI6IkEyNTZHQ00iLCJlcGsiOnsieCI6Im96WlhzMTZ2SU1JeC1LS2haWkpMaUVtRjBQdkFZOFM0eTFaWVdTWWxkazQiLCJjcnYiOiJYMjU1MTkiLCJrdHkiOiJPS1AifX0.X2YlOs8K10pYG9gaIwcNEO7ET93styvhy_OGl-AG5LBR6tk_cqeMIw.jJOldIv-WfX51DYA.gZK2hJgaXV5ksZecQlI-Vfqxbv44_eWt7Cwk48M0ZY76_42IGDmWRXEKFyHRZcN2COlEWcRYIQ9AI9LjIzTMMmBO1h21IkjRLzjH00j9Gc-MDl2Wax_AxoQG3YpouBpP6cMGWDFlBtEfdUCDO2yfe1cX_cH8WyuJArZCbPDcitTtiMgAShvu6VNBziB9_V_txesWck993IN45gXCJGOMVuyhtWjW8YsIvFb60v-98DmhhFX8lMlP1Qx2Y7vvnfmtIGZGC-d2zMdjAnuVQzY1G4I0iG70oGbpnuPg-QMdAPRiULTWGcL2zwUh-PMVXHEfeoEF1OTEceXLdXWzMpUL_fu-sk8MAeP_r-4_A9gh_ZGwEmbbb80DBy2jRLzLpsx7VK1kY_pynlo1SlD1TTOZvTVcgc4tHHRZnMctHnr2wZkm1N8A0RL4CfgxPUYLGBE3R3NXh-2f4a_JIjhZw220VRzImtVGCpb6bDerb9Q69eqBaStRnJopRHUgCXeRiq4IyhuRhuiOCZWB7Uw5fGkud6vOxUE-XJh2E7IazUCmeHjqNocUA-kz.nyUT3sa1qfPoMe1X_ANL-Q",
  "52eea0dc4f17ca24fc34677d803d88ee52f506398a2b295d615636b78f9da2a7": {
    "7a85fcba9eadcf8ccb29af78a06e5b9beb17bc1f4c860d4a4ecf2dfeca447ffa": [
      "461b8e14bbae54cfe2f0216bbff41ec4fed64b7410c71751995f54dbff8d9d42",
      "bf7b3eebbbad2b0a64c34aa16868847788ca31ee0c47ea1d67888bbb64c73a2d"
    ],
    "f9008bb76a0e1523b236430a9561087e8995b36d3825b0a17627f7cc9170706a": [
      "b0f3716dc7545863015358c59fc4cdcf32a544fcb8c7bd924d7aab9ec3d024ab"
    ],
    "5f7af41d38929438da3be3d0bca2c5ee99acfd0b93fa5d02f625a37609aaefe4": "4e49b574f544e9b58535099290e866967040ba187de2585b69bca4e4c34268f9",
    "6ef91db0f6dada1c87473fe9c5a34c2b07cd16de564d17615c53f9f8b06fb066": "e34d3c4394a16288510ee7f3d59ae1ee9f6bb95c6c3acc85fe910899a7cfa467",
    "f02e12dde03990ea2d1335b1b68644332ecb1ba6cffa24ba3df823027d770fea": "2f5c3b84ab871ae0cf0876fd4357bafa9b6f548d252f8f553138bbf6dc0ee7d9",
    "262ccd808d4554b91d2ca20fea330879fc594d281619e5b267296fb2b1e5267f": {
      "4a0bbb40bfe0e6615b3d8f52c105f80daec2aeb5c3794bfdefe06b256ce4594b": "39ab32f4a399115a241f7f0fb26e0f6162ddfffca35e26477c9f93ebf2ec7295",
      "558a7ed37ac12cfd0b2631b15625be552fadec9f50bc9ada97ebe14affee2499": {
        "7955ec0d369752740d4e99f77f38df92060c8daf2331db8231e9b70e772ad874": "499ffa6077e6581f34ffc34f5382e80103d918b6dcab0e742ee11b7b6dd5f009"
      },
      "daa81628a89684f880f02d9b6b30dbe84d011dac43cce1b4b3ab668040c1c8fa": [
        {
          "beb80a21c8f3dfd87fa956c1f3d65c0ab2ed588d201433c9439ef67177b70a55": "f06cdeffc6a93113c15688976e9cbff790d9fe939aa33e835603390f3435ad73"
        },
        {
          "beb80a21c8f3dfd87fa956c1f3d65c0ab2ed588d201433c9439ef67177b70a55": "4cdf70965c90e16936cc7baaa3264077ed75587331631966b7c1ffead24472b7"
        }
      ]
    },
    "197b9fa9a4000d7b22ae435f3086966935c68d1f8ded0a9de12b6cab02657e92": {
      "4a0bbb40bfe0e6615b3d8f52c105f80daec2aeb5c3794bfdefe06b256ce4594b": "4e27b072dd14b3d808399af7b2bce18cacd76d760d1a953a023ec7ee486727f4"
    },
    "4a0bbb40bfe0e6615b3d8f52c105f80daec2aeb5c3794bfdefe06b256ce4594b": "497c3876dfedb54c3e94aaf803480948380f155d09b1d0eb2121d3b80d7cb53b"
  }
}
```

The `cipher` key contains the probablistic encryption of the actual data. The `searchable` data contains the determinate hashing of the data's key value pairs. 

In practice, each user or organization should use their own salt value so no people will have matching hashes even if they are using the same values. This could be the thumbprint of the key the user or organization is going to use to encrypt/decrypt the data.

Additionally, each user/organization should use their own key pair for encryption. These keys should never be comitted to source or saved in the database directly and ideally would be kept in a service like Google Secret Manager or another providers equivelant service. 

You would then retrieve the keys when encrypting and decrypting data.

The ones in the 'key.js' file are there so you can easily test and play with the repository to understand how everything works together.

## Optional Configurations

## Hashing Keys
If you are not worried about the keys being readable in the database you can opt out of hashing them. One benefit of doing this would be it will allow you to build indexes on fields to speed up queries.
