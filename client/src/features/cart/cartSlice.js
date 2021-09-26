import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], totalAmount: 0 },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    pushToCart: (state, action) => {
      if (state.cart.length === 0) {
        state.cart.push(action.payload);
        return state;
      } else {
        // let index = state.cart.findIndex((el) => el.id === action.payload.id);
        // console.log(index);
        // if (index == -1) {
        //   return { ...state, cart: [...state.cart, action.payload] };
        // }
        const newItem = current(state.cart).filter(
          (item) => item.id === action.payload.id
        );

        if (newItem.length === 0) {
          return { ...state, cart: [...state.cart, action.payload] };
        }
      }
      return state;
      //   const newItem = state.cart.filter(
      //     (item) => item.id !== action.payload.id
      //   );
      //   console.log(newItem);
      //   if (newItem.length > 0) {
      //     console.log(action.payload);
      //     state.cart.push(action.payload);
      //     return state;
      //   }
      // }
    },
    updateQuantity: (state, action) => {
      const id = action.payload.id;
      const value = action.payload.value;

      state.cart = state.cart.map((item) => {
        if (item.id === id) {
          item.quantity = value;
        }
        return item;
      });
    },
    updateTotalAmount: (state, action) => {
      const amount = action.payload;

      state.totalAmount = amount;
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: {
    [logout]: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  pushToCart,
  removeItem,
  updateQuantity,
  updateTotalAmount,
  updateCart,
} = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectTotalAmount = (state) => state.cart.totalAmount;

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default cartSlice.reducer;
