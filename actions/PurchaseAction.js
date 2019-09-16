import axios from 'axios';
export const loadAllProduct = () => {
    return (dispatch) => {
        dispatch({ type: 'loadAllProduct' });
        //console.log(API_GET_CUSTOMER);
        axios.get('http://localhost:8088/RDSdev/product/getAllProduct')
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log('success');
            loadAllProductSuccess(dispatch, data.datas);
          } else {
            console.log('fail');
            loadAllProductFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err);
          loadAllProductFail(dispatch, err);
        });
    }
}

export const loadAllPurchases = (index) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_PURCHASE' });
        axios.get(`http://localhost:8088/RDSdev/purchaseH/getAllPurchaseH/${index-1}`)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log('success', data);
            loadPurchaseSuccess(dispatch, data, index);
          } else {
            console.log('fail');
            loadPurchaseFail(dispatch, 'Bad Request');
          }
        })
        .catch(err => {
          console.log(err);
          loadPurchaseFail(dispatch, err);
        });
    }
}

export const loadPurchaseById = (item) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_PURCHASEBYID' });
        axios.get(`http://localhost:8088/RDSdev/purchaseD/getAllPurchaseDByHeader/${item.idPurchaseH}`)
        .then(response =>{ 
            console.log(response)
            const data = response.data.datas;
            const detail = data.map(item => {
                return {
                    idProduct: item.idProduct,
                    productName: item.productName,
                    price: item.productPrice,
                    qty: item.qty,
                    subtotal: item.productPrice * item.qty
                }
            })
            console.log(detail)
            loadPurchaseByIdSuccess(dispatch, detail, item);
        })
        .catch(error => console.log(error));
    }
}

const loadPurchaseByIdSuccess = (dispatch, detail, header) => {
    dispatch({
        type: 'LOAD_PURCHASEBYID_SUCCESS',
        detail,
        header,
    })
}

export const savePurchase = (details, header) => {
    const detailList = () => details.map(item => {
        console.log(item);
        return {
            idProduct: item.idProduct,
            qty: item.qty,
        };
    });
    const body = {
       idPurchaseH: header.idPurchaseH, 
       discount: header.discount, 
       orderDate: header.orderDate,
       totalPrice: header.totalPrice,
       purchases: detailList()
    };
    return (dispatch) => {
        dispatch({ type: 'SAVE_PURCHASE' });
        //console.log(API_GET_CUSTOMER);
        axios.post('http://localhost:8088/RDSdev/purchaseH/add', body)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log('body', body);
            console.log('success', response);
            savePurchaseSuccess(dispatch, data.datas);
          } else {
            console.log('fail');
            savePurchaseFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err);
          savePurchaseFail(dispatch, err.toString());
        });
    }
}

export const setDetail = (details) => {
    let totalPrice = 0;
    details.map(item => totalPrice+= item.subtotal)
    return {
        type: 'setDetail',
        payload: details,
        total: totalPrice,
    };
};

const loadAllProductSuccess = (dispatch, payload, index) => {
    let data = [];
    payload.map((item) => {
        const ret = {
            label: item.productName,
            value: item,
        }
        data.push(ret);
    });
    dispatch({
        type: 'loadAllProductSuccess',
        payload: data,
    })
}

const loadAllProductFail = (dispatch, message) => {
    dispatch({
        type: 'loadAllProductSuccess',
        payload: message,
    })
}

const savePurchaseSuccess = (dispatch) => {
    dispatch({
        type: 'SAVE_PURCHASE_SUCCESS'
    })
}

const savePurchaseFail = (dispatch, message) => {
    dispatch({
        type: 'SAVE_PURCHASE_FAIL',
        payload: message,
    })
}

export const purchaseValidationError = (message) => {
    return {
        type: 'SAVE_PURCHASE_FAIL',
        payload: message,
    }
}

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

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

const loadPurchaseSuccess = (dispatch, payload, index) => {
    console.log(payload);
    const purchases = () => (payload.datas.map(item => {
        return {
            idPurchaseH: item.idPurchaseH,
            orderDate: formatDate(item.orderDate),
            totalPrice: item.totalPrice,
            discount: item.discount,
            netPrice: item.totalPrice - item.discount, 
        }
    }))
    dispatch({
        type: 'LOAD_PURCHASE_SUCCESS',
        totalRow: payload.rows,
        data: purchases(),
        index: index,
    })
}

export const deletePurchase = (item) => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_PURCHASE' });
        axios.get(`http://localhost:8088/RDSdev/purchaseH/delete/` + item.idPurchaseH)
        .then(response =>{ 
          savePurchaseSuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            savePurchaseFail(dispatch, error.toString());
        });
    }
  }

const loadPurchaseFail = (dispatch, message) => {
    dispatch({
        type: 'LOAD_PURCHASE_FAIL',
        payload: message,
    })
}

export const setModalPurchase = (modalForm) => {
    return {
        type: 'setModalPurchase',
        payload: modalForm
    }
}

export const resetPurchase = () => {
    return {
        type: 'resetPurchase',
    }
}