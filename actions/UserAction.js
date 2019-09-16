import axios from 'axios';

export const loadUser = (index) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_MASTER_USER'});
        axios.get(`http://localhost:8088/RDSdev/user/getAllUser/${index-1}`)
        .then(response => {
            const data = response.data;
            loadUserSuccess(dispatch, data, index);
        })
        .catch(error => {
            loadUserFail(dispatch, error);
        })
    };
}

const loadUserSuccess = (dispatch, data, index) => {
    const payload = () => (data.datas.map((item) => {
        return {
            idUser: item.idUser,
            name: item.name,
            address: item.address,
            email: item.email,
            phone: item.phone,
        };
    }));

    dispatch({
        type: 'LOAD_MASTER_USER_SUCCESS',
        payload: payload(),
        totalRow: data.rows,
        index,
    });
}

const loadUserFail = (dispatch, message) => {
    dispatch({
        type: 'LOAD_MASTER_USER_FAIL',
        payload: message,
    })
}
export const loadUserById = (item) => {
    console.log('ini item', `http://localhost:8088/RDSdev/user/getOneUser/${item.idUser}`);
    return (dispatch) => {
        dispatch({ type: 'LOAD_USERBYID'});
        axios.get(`http://localhost:8088/RDSdev/user/getOneUser/${item.idUser}`)
        .then(response => {
            const data = response.data;
            console.log(response);
            loadUserByIdSuccess(dispatch, data.datas);
        })
        .catch(error => {
            loadUserByIdFail(dispatch, error);
        })
    };
}

const loadUserByIdSuccess = (dispatch, data) => {
    dispatch({
        type: 'LOAD_USERBYID_SUCCESS',
        payload: data,
    })
}

const loadUserByIdFail = (dispatch, message) => {
    dispatch({
        type: 'LOAD_USERBYID_FAIL',
        payload: message.toString(),
    })
}


export const setModalUser = (modalForm) => {
    return {
        type: 'SET_MODAL_USER',
        payload: modalForm
    }
}
export const resetMasterUser = () => {
    return {
        type: 'RESET_MASTER_USER',
    }
}

export const saveUser = (item) => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_USER'});
        axios.post(`http://localhost:8088/RDSdev/user/add`, item)
        .then(response => {
            console.log(response);
            saveUserSuccess(dispatch);
        })
        .catch(error => {
            saveUserFail(dispatch, error);
        })
    };
};

export const deleteUser = (item) => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_USER' });
        axios.get(`http://localhost:8088/RDSdev/user/activation/` + item.idUser)
        .then(response =>{ 
          saveUserSuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            saveUserFail(dispatch, error.toString());
        });
    }
  }

const saveUserSuccess = (dispatch) => {
    dispatch({
        type: 'SAVE_USER_SUCCESS',
    })
}

const saveUserFail = (dispatch, message) => {
    dispatch({
        type: 'SAVE_USER_FAIL',
        payload: message.toString(),
    })
}

export const userValidationError = (message) => {
    return {
        type: 'SAVE_USER_FAIL',
        payload: message,
    }
}