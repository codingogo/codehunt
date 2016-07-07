import React from 'react';
import Popup from './Popup';
import Actions from '../../actions'

class LoginPopup extends React.Component {
  handleLogin = () => {
    Actions.login();
    this.props.hidePopup();
  };

  render(){
    return(
      <Popup {...this.props} style="login-popup">
        <img src="/img/delb.png"/>
        <h1 className="absolute">(hide)</h1>
        <h2>Login to Join The Community</h2>
        <p><strong>delb</strong> is a community to share the latest happiness.</p>
        <button className="facebook-btn" onClick={this.handleLogin}>Login with Facebook</button>
        <p>We will never post to Facebook without your permission.</p>
      </Popup>
    );
  }
}

export default LoginPopup;