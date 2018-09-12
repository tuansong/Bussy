import { combineReducers } from 'redux';
import { LoginReducer as login } from "./LoginReducer";
import { SearchReducer as search } from "./SearchReducer";
import { BusReducer as bus } from "./BusReducer";

export default
combineReducers({
  login,
  search,
  bus
});