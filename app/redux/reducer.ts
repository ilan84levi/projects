import { Store } from './store';
import { Action } from './action';
import { ActionType } from './action-type';



export class Reducer {
    public static reduce(oldStore: Store, action: Action): Store {

        const newStore = { ...oldStore };

        switch (action.type) {
            case ActionType.GetAllCategories:
                newStore.categories = action.payload;
                break;

            case ActionType.GetAllItems:
                newStore.products = action.payload;
                break;

            case ActionType.loginAdmin:
                newStore.isLoggedIn = true;
                break;

            case ActionType.adminLogout:
                newStore.isLoggedIn = false;
                break;

            case ActionType.loginCustomer:
                newStore.customerLoggedIn = true;
                break;

            case ActionType.logOutCustomer:
                newStore.customerLoggedIn = false;
                break;

            case ActionType.GetOneCustomer:
                newStore.customer = action.payload;
                break;

            case ActionType.GetOneProduct:
                for (let i = 0; i < newStore.products.length; i++) {
                    if (newStore.products[i]._id === action.payload.id) {
                        newStore.product = newStore.products[i]
                        console.log(newStore.product)
                        break;
                    }
                }

            case ActionType.UpdateProduct:
                newStore.productToUpdate = action.payload;
                break;

            case ActionType.getProductToUpdate:
                newStore.productToUpdate
                break;


            // case ActionType.UpdateProduct:
            //      for (let i = 0; i < newStore.products.length; i++) {
            //          if (newStore.products[i]._id === action.payload.id) {
            //             action.payload = newStore.productToUpdate
            //              break;
            //          }
            //      }
            //      break;

        }
        // console.log(newStore)
        return newStore;
    }



}

