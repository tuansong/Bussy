const initialState = {
  places: [],
  buses: []
};
export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLACES" :
      return {
        ...state,
        places: action.data,
      };
    case "GET_BUSES" :
      return {
        ...state,
        buses: action.data,
      };
    case "SORT_PRICE_BUSES": 
      return {
        ...state,
        buses: action.busesData,
      };
    default:
      return state;
  }
};