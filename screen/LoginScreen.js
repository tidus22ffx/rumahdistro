import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { login, passwordTextChange, usernameTextChange } from '../actions';
import { brandLogo, logoTransparent } from '../assets/image';
import { CardView, TextInput } from '../component/common';
import { FaUser, FaLock } from 'react-icons/fa';

class LoginScreen extends Component {
  state = {
    buttonHovered: false,
    buttonClicked: false
  }
  componentWillMount(){
    console.log(this.props);
    this.setState({height: window.innerHeight});
  }

  componentWillUpdate(){
    console.log('bangsat', this.props.loggedIn);
    if(this.props.loggedIn){
      return(
        this.props.history.push(`/Home`)
      )
    }
  }

  onButtonHover() {
    this.setState({buttonHovered: true});
  }
  onButtonLeave() {
    this.setState({buttonHovered: false, buttonClicked: false});
  }

  onButtonClicked() {
    this.setState({buttonClicked: true});
    this.props.login(this.props.username,this.props.password);
  }

  onChangeTextUsername(text){
    this.props.usernameTextChange(text.target.value);
    console.log(this.props.username);
  }

  onChangeTextPassword(text){
    //console.log(text);
    this.props.passwordTextChange(text.target.value);
  }

  renderButton(){
    if(this.props.loading){
      return(
        <button style={styles.buttonStyle} >
          <Loader type="Puff" color="#c39243" height={25} width={25}/>
        </button>  
      );
    }
    return(
      <button 
        style={this.state.buttonHovered === true ? {...styles.buttonStyle, ...styles.buttonStyleHovered} : styles.buttonStyle }
        onMouseEnter={() => this.onButtonHover()}
        onMouseLeave={() => this.onButtonLeave()}
        onClick={() => this.onButtonClicked()}>
          LOGIN
      </button>
    )
  }

  renderError(){
    if(this.props.error){
      return <div style={styles.errorText}>{this.props.error}</div>
    } else {
      return <div style={styles.errorText}></div>
    }
  }

  render() {
    const { wrapperStyle, bodyStyle, logoContainer, logoStyle } = styles;
    return (
      <div style={wrapperStyle}>
        <div style={bodyStyle}>
            <div style={logoContainer}>
                <img style={logoStyle} src={logoTransparent} />
            </div>
            <div style={{ flex:0.5, display: 'flex', justifyContent: 'center'}}>
                <CardView 
                style={styles.cardStyle}
                width='20%'>
                    <TextInput width='80%' icon={FaUser} value={this.props.username} onChangeText={this.onChangeTextUsername.bind(this)} placeholder='Username' />
                    <div style={{height: 10}}></div>
                    <TextInput type='password' width='80%' icon={FaLock} value={this.props.password} onChangeText={this.onChangeTextPassword.bind(this)} placeholder='Password' />
                    <div style={{height: 20}}></div>
                    {this.renderError()}
                    {this.renderButton()}
                </CardView>
            </div>
        </div>
      </div>
    );
  }
};

const styles = {
  wrapperStyle: {
    flexDirection: 'column',
    backgroundColor: '#333333',
    height: window.innerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //border: '1px white solid',
  },
  bodyStyle: {
    display: 'flex',
    paddingTop: '25px',
    paddingBottom: '25px',
    flexDirection: 'column',
    maxHeight: window.innerHeight,
    //border: '1px white solid',
  },
  cardStyle:{
    padding: 15, 
    //border: '1px white solid', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  logoContainer: {
      display: 'flex',
      flex: 1,
      padding: 20,
      maxHeight: window.innerHeight * 0.55,
      justifyContent: 'center'
  },
  logoStyle: {
      display: 'flex',
      //border: '1px white solid', 
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      flex: 1
  },
  buttonStyle: {
    border: '2px solid',
    borderColor: '#c39243',
    width: '80%',
    height: 40,
    display: 'flex',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.2s',
    borderRadius: 3,
    fontWeight: 600,
    color: '#f8f8f8', 
  },
  buttonStyleHovered: {
    backgroundColor: '#c39243',
    color: '#333333',
    borderColor: '#c39243',
  },
  buttonStyleClicked: {
    backgroundColor: '#c39200',
    color: '#f8f8f8',
    fontSize: 16,
    width: '85%'
  },
  errorText: {
    color: 'red',
    fontFamily: 'Titillium Web',
    fontSize: 14,
    width: 'auto',
    height: 'auto',
    fontWeight: '400'
  } 
}
  
const mapStateToProps = ({loginData}) => {
  return loginData;
};

export default connect(mapStateToProps, { 
  login,
  passwordTextChange, 
  usernameTextChange 
})(LoginScreen);
