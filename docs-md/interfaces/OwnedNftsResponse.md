[alchemy-evm-js](../README.md) / [Exports](../modules.md) / OwnedNftsResponse

# Interface: OwnedNftsResponse

The response object for the [getNftsForOwner](../modules.md#getnftsforowner) and
[getNftsForOwnerIterator](../modules.md#getnftsforowneriterator) functions. The object contains the NFTs with
metadata owned by the provided address, along with pagination information and
the total count.

## Table of contents

### Properties

- [ownedNfts](OwnedNftsResponse.md#ownednfts)
- [pageKey](OwnedNftsResponse.md#pagekey)
- [totalCount](OwnedNftsResponse.md#totalcount)

## Properties

### ownedNfts

• `Readonly` **ownedNfts**: [`OwnedNft`](OwnedNft.md)[]

The NFTs owned by the provided address.

#### Defined in

[types/types.ts:248](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L248)

___

### pageKey

• `Optional` `Readonly` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[types/types.ts:254](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L254)

___

### totalCount

• `Readonly` **totalCount**: `number`

The total count of NFTs owned by the provided address.

#### Defined in

[types/types.ts:257](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L257)