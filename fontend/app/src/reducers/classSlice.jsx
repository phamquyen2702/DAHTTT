const { createSlice } = require("@reduxjs/toolkit");
const classSlice = createSlice({
  name: "class",
  initialState: {
    cartItems: [],
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
      }
    },
    deleteFromCart(state, action) {
      const malophocdelete = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x.malophoc !== malophocdelete
      );
    },
  },
});
const { actions, reducer } = classSlice;
export const { addToCart, deleteFromCart } = actions;
export default reducer;
