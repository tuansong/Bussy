import React, { Component } from 'react';
import createStore from "./Store";
import { Provider } from "react-redux";
import LoginScreen from "./Screens/Login/Login";

import { BrowserRouter } from 'react-router-dom'

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {/* <SearchScreen/> */}
          <LoginScreen />
          {/* <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/login" component={LoginScreen}/>
          </Switch> */}
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
