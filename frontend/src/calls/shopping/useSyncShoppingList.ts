import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const SYNC_SHOPPING_LIST_MUTATION = gql(`
mutation SyncShoppingList($items: [ShoppingListItemInput!]) {
    syncShoppingList(items: $items)
  }
`);

export const useSyncShoppingList = () => {
  const [syncShoppingListMutation, syncShoppingListResult] = useMutation(
    SYNC_SHOPPING_LIST_MUTATION
  );
  return { syncShoppingListMutation, syncShoppingListResult };
};
