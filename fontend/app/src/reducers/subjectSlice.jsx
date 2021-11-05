const { createSlice } = require("@reduxjs/toolkit");
const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(
        (x) => x.mahocphan === newItem.mahocphan
      );
      if (index > 0) {
        return;
      } else {
        state.cartItems.push(newItem);
      }
    },
    deleteFromCart(state, action) {
      const mahocphanToDelete = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => x.mahocphan !== mahocphanToDelete
      );
    },
  },
});
const { actions, reducer } = subjectSlice;
export const { addToCart, deleteFromCart } = actions;
export default reducer;
