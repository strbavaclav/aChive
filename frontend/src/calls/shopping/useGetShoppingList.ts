import { gql } from "gql/gql";

export const GET_SHOPPING_LIST = gql(/* GraphQL */ `
  query GetShoppingList {
    getShoppingList {
      userId
      items {
        _id
        itemName
        quantity
        unit
        checked
      }
    }
  }
`);
