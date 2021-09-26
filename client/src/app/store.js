import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import messageReducer from "../features/messageSlice";

import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const productPersistConfig = {
  key: "product",
  storage,
  whitelist: ["input", "filteredData"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  product: persistReducer(productPersistConfig, productReducer),
  message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
const persistor = persistStore(store);

export { store, persistor };
