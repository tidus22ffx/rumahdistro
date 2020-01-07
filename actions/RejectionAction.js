import axios from 'axios';

// export const loadTransaksi = () => {
//     return (dispatch) => {
//         dispatch({ type: 'loadTransaksi' });
//         axios.get('http://localhost:8088/RDSdev/orderH/getAllOrderH')
//         .then(response => {
//           const data = response.data;
//           if (data.status === 200) {
//             loadTransaksiSuccess(dispatch, data.datas);
//           } else {
//             loadTransaksiFail(dispatch, 'Invalid Credential');
//           }
//         })
//         .catch(err => {
//           console.log(err);
//           loadTransaksiFail(dispatch, err);
//         });
//     } 
// }

export const loadProduct = () => {
    return (dispatch) => {
        dispatch({ type: 'loadProduct' });
        axios.get(`http://localhost:8088/RDSdev/product/getAllProduct`)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            loadProductSuccess(dispatch, data.datas);
          } else {
            loadProductFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err);
          loadProductFail(dispatch, err);
        });
    } 
}

// export const loadReject = (index, timeStamp = null) => {
//     return (dispatch) => {
//         dispatch({ type: 'loadReject' });
//         const searchUrl = `http://localhost:8088/RDSdev/reject/getAllRejectSearch/${timeStamp}/${index-1}`;
//         const loadAllUrl = `http://localhost:8088/RDSdev/reject/getAllReject/${index-1}`
//         const url = timeStamp !== null ? searchUrl : loadAllUrl;
//         axios.get(url)
//         .then(response => {
//           const data = response.data;
//           if (data.status === 200) {
//             loadRejectSuccess(dispatch, data, index);
//           } else if (data.status === 202) {
//             loadRejectSuccess(dispatch, data, index);
//           } else {
//               loadRejectFail(dispatch, data.message);
//           }
//         })
//         .catch(err => {
//           console.log(err);
//           loadRejectFail(dispatch, err);
//         });
//     } 
// }

export const loadReject = (index, timeStamp = null) => {
    return (dispatch) => {
        dispatch({ type: 'loadReject' });
        const url = `http://localhost:8088/RDSdev/StockReject/getAllRejectStock/`
        axios.get(url)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            loadRejectSuccess(dispatch, data, index);
          } else if (data.status === 202) {
            loadRejectSuccess(dispatch, data, index);
          } else {
              loadRejectFail(dispatch, data.message);
          }
        })
        .catch(err => {
          console.log(err);
          loadRejectFail(dispatch, err);
        });
    } 
}

export const loadRejectById = (item) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_REJECTBYID' });
        axios.get(`http://localhost:8088/RDSdev/reject/getOneReject/${item.idReject}`)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            loadRejectByIdSuccess(dispatch, data.datas);
          } else {
            console.log('fail');
            loadRejectByIdFail(dispatch, data.message);
          }
        })
        .catch(err => {
          console.log(err);
          loadRejectFail(dispatch, err);
        });
    } 
}

export const saveRejection = (modalData, status=0) => {
    console.log({modalData});
    return (dispatch) => {
        dispatch({ type: 'saveReject' });
        const body = {
            'id':modalData.rejectId,
            'idProduct' : modalData.product.value,
            'rejectDate' : modalData.rejectDate,
            'qty' : modalData.qty,
            'rejectType' : modalData.status.value,
            'status' : modalData.status.value,
        }
        axios.post('http://localhost:8088/RDSdev/reject/add', body)
        .then(response => {
          const data = response.data;
          console.log(modalData);
          if (data.status === 200) {
            saveRejectSuccess(dispatch, data.datas);
          } else {
            saveRejectFail(dispatch, data.message);
          }
        })
        .catch(err => {
          console.log(err);
          saveRejectFail(dispatch, err.toString());
        });
    } 
}

// const loadRejectSuccess = (dispatch, payload, index) => {
//     let data = [];
//     payload.datas.map((item) => {
//         const status = () => {
//             if(item.status === 1){
//                 return 'Diproses';
//             } else if(item.status === 2) {
//                 return 'Disumbangkan';
//             }
//             return 'Diretur';
//         }
//         const ret = {
//             id: item.id,
//             rejectDate: new Date(item.rejectDate).toLocaleDateString('id-ID'),
//             product: item.product.productName,
//             qty: item.qty,
//             status: status(),
//         }
//         data.push(ret);
//     })
//     dispatch ({
//         type: 'loadRejectSuccess',
//         payload: data,
//         index: index,
//         totalRow: payload.rows,
//     })
// }

const loadRejectSuccess = (dispatch, payload, index) => {
    let data = [];
    payload.datas.map((item) => {
        const ret = {
            id: item.idProduct,
            product: item.name,
            stock: item.stock,
        }
        data.push(ret);
    })
    dispatch ({
        type: 'loadRejectSuccess',
        payload: data,
        index: index,
        totalRow: payload.rows,
    })
}

const loadRejectFail = (dispatch, message) => {
    dispatch ({
        type: 'loadRejectFail',
        payload: message,
    })
}

// const loadTransaksiSuccess = (dispatch, payload) => {
//     let data = [];
//     payload.map((item) => {
//         const ret = {
//             label: item.idOrderH,
//             value: item.idOrderH,
//         }
//         data.push(ret);
//     })
//     dispatch ({
//         type: 'loadTransaksiSuccess',
//         payload: data,
//     })
// }

// const loadTransaksiFail = (dispatch, message) => {
//     dispatch ({
//         type: 'loadTransaksiFail',
//         payload: message,
//     })
// }

const loadProductSuccess = (dispatch, payload) => {
    let data = [];
    payload.map((item) => {
        const ret = {
            label: item.productName,
            value: item,
        }
        data.push(ret);
    })
    dispatch ({
        type: 'loadProductSuccess',
        payload: data,
    })
}

const loadProductFail = (dispatch, message) => {
    dispatch ({
        type: 'loadProductFail',
        payload: message,
    })
}

const saveRejectSuccess = (dispatch) => {
    dispatch ({
        type: 'saveRejectSuccess',
    })
}

const saveRejectFail = (dispatch, message) => {
    dispatch ({
        type: 'saveRejectFail',
        payload: message,
    })
}

export const rejectValidationError = (message) => {
    return {
        type: 'saveRejectFail',
        payload: message,
    }
}

const loadRejectByIdSuccess = (dispatch, data) => {
    const rejectType = () => {
        if(data.rejectType === 1){
            return 'Barang Rusak';
        } else if(data.rejectType === 2){
            return 'Barang Hilang';
        }
        return 'Barang Salah';
    }
    const modalData = {
        rejectId: data.id,
        rejectDate: new Date(data.rejectDate).getTime(),
        product: {
            label: data.product.productName,
            value: data.product
        },
        qty: data.qty,
        rejectType: {
            label: rejectType(),
            value: data.rejectType,
        },
        status: data.status,
    }
    dispatch({
        type: 'LOAD_REJECTBYID_SUCCESS',
        payload: modalData,
    })
}

export const deleteReject = (item) => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_REJECT' });
        axios.get(`http://localhost:8088/RDSdev/reject/delete/` + item.rejectId)
        .then(response =>{ 
          saveRejectSuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            saveRejectFail(dispatch, error.toString());
        });
    }
  }

const loadRejectByIdFail = (dispatch, message) => {
    dispatch ({
        type: 'LOAD_REJECTBYID_FAIL',
        payload: message,
    })
}

export const setModalState = (modalForm) => {
    return {
        type: 'setModalState',
        payload: modalForm
    }
}

export const resetRejection = () => {
    return {
        type: 'resetRejection',
    }
}

export const resetRejectionPopup = () => {
    return {
        type: 'resetRejectionPopup',
    }
}

// export const loadProductByIdReject = (item) => {
//     return (dispatch) => {
//         dispatch({ type: 'LOAD_PRODUCTBYID_REJECT' });
//         axios.get(`http://localhost:8088/RDSdev/product/getOneProd/${item.idProduct}`)
//         .then(response =>{ 
//             console.log(response);
//             loadProductByIdSuccess(dispatch, response.data.datas);
//         })
//         .catch(error => console.log(error));
//     }
// }

export const getProductData = (data) => {
    console.log(data);
    const modalData = {
        rejectId: null,
        rejectDate: new Date().getTime(),
        product: {
            label: data.product,
            value: data.id
        },
        qty: data.stock,
        rejectType: null,
        status: null,
    }
    return {
        type: 'LOAD_REJECTBYID_SUCCESS',
        payload: modalData,
    };
}