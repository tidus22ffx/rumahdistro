import axios from 'axios';

export const login = (userid, password) => {
    const config = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    console.log(userid,password);
    return (dispatch) => {
        dispatch({ type: 'login' });
        //console.log(API_GET_CUSTOMER);
        axios.post('http://localhost:8088/RDSdev/user/login', {
            "userid": userid,
            "password": password
        })
        .then(response => {
          const data = response.data;
          console.log(response);
          if (data.status === 1) {
            console.log('success');
            loginSuccess(dispatch, data);
          } else {
            console.log('fail');
            loginFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err, err.response);
          loginFail(dispatch, err.response);
        });
    } 
};

const loginSuccess = (dispatch, data) => {
    sessionStorage.setItem('userData', JSON.stringify(data.datas));
    dispatch({type: 'loginSuccess', payload: data});
}
const loginFail = (dispatch, message) => {
    dispatch({type: 'loginFail', payload: message});
}

export const passwordTextChange = (text) => {
  
  return {
    type: 'password_text_change',
    payload: text,
  }
}

export const usernameTextChange = (text) => {
  return {
    type: 'username_text_change',
    payload: text,
  }
}