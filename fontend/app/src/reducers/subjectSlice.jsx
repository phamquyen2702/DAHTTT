import getCookie from "../component/getcookie";
import setcookie from "../component/setcookie";
const { createSlice } = require("@reduxjs/toolkit");
const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    cartItems: getCookie("cartDKHP") ? JSON.parse(getCookie("cartDKHP")) : [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(
        (x) => x.mahocphan === newItem.mahocphan
      );
      if (index >= 0) {
        throw new Error(`Mã học phần ${newItem.mahocphan} đã được đăng kí`);
      } else {
        state.cartItems.push(newItem);
        setcookie("cartDKHP", JSON.stringify(state.cartItems), 5);
      }
    },
    deleteFromCart(state, action) {
      const mahocphanToDelete = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x.mahocphan !== mahocphanToDelete
      );
      setcookie("cartDKHP", JSON.stringify(state.cartItems), 5);
    },
  },
});
const { actions, reducer } = subjectSlice;
export const { addToCart, deleteFromCart } = actions;
export default reducer;
