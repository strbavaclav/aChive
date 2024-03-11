import { useMutation } from "@apollo/client";
import { gql } from "gql/gql";

const SET_SHOPPING_LIST_SETTINGS_MUTATION = gql(`
mutation SetShoppingListSettings($shopListSettings: ShopListSettingsInput!) {
  setShoppingListSettings(ShopListSettings: $shopListSettings) {
    shopping {
      prepDays
      prepStartTime
      prepEndTime
      shopDays
      shopStartTime
      shopEndTime
    }
  }
}
`);

export const useSetShoppingListSettings = () => {
  const [setShoppingListSettingsMutation, setShoppingListSettingsResult] =
    useMutation(SET_SHOPPING_LIST_SETTINGS_MUTATION);
  return { setShoppingListSettingsMutation, setShoppingListSettingsResult };
};
