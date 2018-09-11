const initialState = {
    loginStatus: false
};
export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
      case "LOGIN" :
          console.log('LOGIN');
          return {
              ...state,
              loginStatus: action.data
          }
      default:
          return state; break;
  }
};