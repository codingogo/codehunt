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
        <h2 className="header-login">Community for Beautiful Things</h2>
        <p className="subheader-login"><strong>delb</strong> is a place to share lovely products.</p>
        <div>
          <button className="facebook-login-btn" onClick={this.handleLogin}>Login with Facebook</button>
        </div>  
        <div>
          <button className="twitter-login-btn">Login with Twitter</button>
        </div>  
        <p className="facebook-disclaimer">We will never post to Facebook or Twitter without your permission.</p>
      </Popup>
    );
  }
}

export default LoginPopup;