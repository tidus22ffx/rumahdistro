import axios from 'axios';

export const loadAllUserOperational = () => {
    return (dispatch) => {
        dispatch({ type: 'loadAllUserOperational' });
        //console.log(API_GET_CUSTOMER);
        axios.get('http://localhost:8088/RDSdev/user/getAllUser')
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log(data);
            loadAllUserSuccess(dispatch, data.datas);
          } else {
            console.log('fail');
            loadAllUserFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err);
          loadAllUserFail(dispatch, err);
        });
    }
}

const loadAllUserSuccess = (dispatch, payload) => {
    let data = [];
    payload.map((item) => {
        const ret = {
            label: item.name,
            value: item,
        }
        data.push(ret);
    });
    dispatch({
        type: 'load_all_user_operational_success',
        payload: data,
    })
}

const loadAllUserFail = (dispatch, data) => {
    dispatch({
        type: 'load_all_user_operational_fail',
        payload: data,
    })
}

export const loadAllOperational = (index, timeStamp = null) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_OPERATIONAL' });
        const searchUrl = `http://localhost:8088/RDSdev/operationalH/getAllOperationalHSearch/${timeStamp}/${index-1}`;
        const loadAllUrl = `http://localhost:8088/RDSdev/operationalH/getAllOperationalH/${index-1}`;
        const url = timeStamp !== null ? searchUrl : loadAllUrl;
        axios.get(url)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            loadAllOperationalSuccess(dispatch, data, index);
          } else if (data.status === 202) {
            loadAllOperationalSuccess(dispatch, data, index);
          } else {
            loadAllOperationalFail(dispatch, 'Data tidak ada');
          }
        })
        .catch(err => {
          loadAllOperationalFail(dispatch, err.toString());
        });
    }
}

const loadAllOperationalSuccess = (dispatch, payload, index) => {
    console.log(payload);
    const operational = () => (payload.datas.map(item => {
        const user = {
            name: item.user.name,
            value: item.user,
        }
        return {
            idOperationalH: item.idOperationalH,
            orderDate: formatDate(item.orderDate),
            user: user,
            totalPrice: item.totalPrice,
        }
    }))
    dispatch({
        type: 'LOAD_OPERATIONAL_SUCCESS',
        totalRow: payload.rows,
        data: operational(),
        index: index,
    })
}

const loadAllOperationalFail = (dispatch, message) => {
    dispatch({
        type: 'LOAD_OPERATIONAL_FAIL',
        payload: message,
    })
}

export const loadOperationalById = (item) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_OPERATIONALBYID' });
        axios.get(`http://localhost:8088/RDSdev/operationalD/getAllOperationalDByHeader/${item.idOperationalH}`)
        .then(response =>{ 
            const data = response.data.datas;
            console.log(data);
            const detail = () => data.map(item => {
                return {
                    productName: item.itemName,
                    price: item.price,
                    qty: item.qty,
                    subtotal: item.price * item.qty,
                }
            });
            console.log(detail());
            loadPurchaseByIdSuccess(dispatch, detail(), item);
        })
        .catch(error => console.log(error));
    }
}

const loadPurchaseByIdSuccess = (dispatch, detail, item) => {
    const modalForm = {
        idOperationalH: item.idOperationalH,
        orderDate: item.orderDate,
        totalPrice: item.totalPrice,
        selectedUser: {
            label: item.user.name,
            value: item.user.value,
        }
    }
    dispatch({
        type: 'LOAD_OPERATIONALBYID_SUCCESS',
        payload: modalForm,
        detail: detail,
    })
}

export const setDetailOperational = (details) => {
    let totalPrice = 0;
    details.map(item => totalPrice += item.subtotal)
    return {
        type: 'setDetailOperational',
        payload: details,
        total: totalPrice,
    };
};

const formatDate = (date) => {
    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

export const setModalOperational = (modalForm) => {
    return {
        type: 'setModalOperational',
        payload: modalForm
    }
}

export const resetOperational = () => {
    return {
        type: 'RESET_OPERATIONAL',
    }
}

export const saveOperational = (header, detail) => {
    const bodyDetail = detail.map(item => {
        return {
            itemName: item.productName,
            price: item.price,
            qty: item.qty
        }
    })
    const body = {
        idOperationalH: header.idOperationalH,
        orderDate: header.orderDate,
        totalPrice: header.totalPrice,
        idUser: header.selectedUser.value.idUser,
        nota: ' ',
        operationalDetails: bodyDetail,
    }
    return (dispatch) => {
        dispatch({ type: 'SAVE_OPERATIONAL' });
        //console.log(API_GET_CUSTOMER);
        axios.post('http://localhost:8088/RDSdev/operationalH/add', body)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log('success', response);
            saveOperationalSuccess(dispatch, data.datas);
          } else {
            console.log('fail');
            saveOperationalFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err.response);
          saveOperationalFail(dispatch, err.toString());
        });
    }
}

export const deleteOperational = (item) => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_OPERATIONAL' });
        axios.get(`http://localhost:8088/RDSdev/operationalH/delete/` + item.idOperationalH)
        .then(response =>{ 
          saveOperationalSuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            saveOperationalFail(dispatch, error.toString());
        });
    }
}

const saveOperationalSuccess = (dispatch) => {
    dispatch({
        type: 'SAVE_OPERATIONAL_SUCCESS'
    })
}

const saveOperationalFail = (dispatch, message) => {
    dispatch({
        type: 'SAVE_OPERATIONAL_FAIL',
        payload: message,
    })
}

export const operationalValidationError = (message) => {
    return {
        type: 'SAVE_OPERATIONAL_FAIL',
        payload: message,
    }
}

