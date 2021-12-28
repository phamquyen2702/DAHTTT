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
        (x) => x.subjectId === newItem.datal.subjectId
      );
      const maxCredit = newItem.maxcredit;
      if (index >= 0) {
        throw new Error(
          `Mã học phần ${newItem.datal.subjectId} đã được đăng kí`
        );
      } else {
        let sum = newItem.sumCredit + newItem.datal.credit;
        if (sum > maxCredit) {
          throw new Error(`Số lượng tín chỉ hiện tại là ${sum} đã quá định mức cho phép`);
        } else {
          state.cartItems.push(newItem.datal);
          setcookie("cartDKHP", JSON.stringify(state.cartItems), 5);
        }
      }
    },
    deleteFromCart(state, action) {
      const mahocphanToDelete = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x.subjectId !== mahocphanToDelete
      );
      setcookie("cartDKHP", JSON.stringify(state.cartItems), 5);
    },
  },
});
const { actions, reducer } = subjectSlice;
export const { addToCart, deleteFromCart } = actions;
export default reducer;
