const INITIAL_STATE = {
    username: null,
    password: null,
    loading: false,
    loggedIn: false,
    userData: null,
    error: null,
}

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'login':
            return {...state, loading: true, error: null};
        case 'loginSuccess':
            return {...state, loading: false, userData: action.payload, loggedIn: true, error: null};
        case 'loginFail':
            return {...state, loading: false, error: action.payload};    
        case 'username_text_change':
            return {...state, username: action.payload};    
        case 'password_text_change':
            return {...state, password: action.payload};
        case 'user_logout':
            return INITIAL_STATE;    
        default:
            return state;
    }
}

export default LoginReducer;