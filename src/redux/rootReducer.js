const initialState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case "addToCart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "updateCart":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "deleteFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    case "showLoading":
      return {
        ...state,
        loading: true,
      };

    case "hideLoading":
      return {
        ...state,
        loading: false,
      };
  }
};
