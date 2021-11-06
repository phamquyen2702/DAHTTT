import getCookie from "../component/getcookie";
import setcookie from "../component/setcookie";

const { createSlice } = require("@reduxjs/toolkit");

const classSlice = createSlice({
  name: "class",
  initialState: {
    cartItems: getCookie("cartDKLH") ? JSON.parse(getCookie("cartDKLH")) : [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(
        (x) => x.malophoc === newItem.malophoc
      );
      if (index > 0) {
        return;
      } else {
        state.cartItems.push(newItem);
        setcookie("cartDKLH", JSON.stringify(state.cartItems), 5);
      }
    },
    deleteFromCart(state, action) {
      const malophocdelete = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x.malophoc !== malophocdelete
      );
      setcookie("cartDKLH", JSON.stringify(state.cartItems), 5);
    },
  },
});
const { actions, reducer } = classSlice;
export const { addToCart, deleteFromCart } = actions;
export default reducer;
