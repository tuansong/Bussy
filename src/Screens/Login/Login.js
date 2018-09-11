import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import FacebookLogin from 'react-facebook-login';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import Search from '../Search/Search';

class Login extends Component {

  state = {
    userID: '',
    name: '',
    avatar: '',
  }

  responseFacebook = (response) => {
    this.setState({
      //isLogginIn: true,
      userID: response.id,
      name: response.name,
      avatar: response.picture.data.url
    })
  }

  componentClicked = () => {
    let loginStatus = true;
    this.props.dispatch({ type: "LOGIN", data: loginStatus })
  }

  render() {
    console.log(this.state.isLogginIn);
    console.log('LoginStatus ' + this.props.loginStatus);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BussY</h1>
          {
            this.props.loginStatus ?
              <div className="Navbar-right">
                <div className="User">
                  <img src={this.state.avatar} alt={this.state.name}/>
                  <h3>{this.state.name}</h3>
                  <button className="Sign-out"
                  >Sign out</button>
                </div>
              </div>
              :
              <Link to="/search" >
                <FacebookLogin
                  appId="2108259072756426"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  callback={this.responseFacebook}
                  textButton="Login"
                  cssClass="Login"
                  icon="fa-facebook" />
              </Link>
          }
        </header>
        <body > 
          {/* <h1>WELCOME TO BUSSY</h1> */}
        </body>
      <Switch>
        <Route exact path="/" />
        <Route exact path="/search" component={Search} />
      </Switch>
      </div >
    );
  }
}
function mapStateToProps(state) {
  return {
    loginStatus: state.login.loginStatus,
  }
}
export default connect(mapStateToProps)(Login);