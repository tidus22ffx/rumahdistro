import axios from 'axios';

export const getImgurToken = () => {
  return (dispatch) => {
    dispatch({ type: 'GET_TOKEN'});
    const bodyFormData = new FormData();
    bodyFormData.set('refresh_token', 'e5cfb383e3a9abad3a4a6f83c5fe990d9749eefb');
    bodyFormData.set('client_id', '9abbb6ff76f454f');
    bodyFormData.set('client_secret', '65a8c2981d7188e571f5e5b243d082930c117867');
    bodyFormData.set('grant_type', 'refresh_token');
    axios.post('https://api.imgur.com/oauth2/token', bodyFormData)
    .then(response => console.log(response.data))
    .catch(err => console.log(err.response));
  }
}

export const loadAllOrder = (index) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_ALL_ORDER' });
        //console.log(API_GET_CUSTOMER);
        axios.get(`http://localhost:8088/RDSdev/orderH/getAllOrderH/${index-1}`)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log('success', data);
            loadAllOrderSuccess(dispatch, data, index);
          } else {
            console.log('fail', data);
            loadAllOrderFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err);
          loadAllOrderFail(dispatch, err);
        });
    } 
}

const loadAllOrderSuccess = (dispatch, payload, index) => {
  const data = payload.datas;
  let view = [];
  data.map((item) => {
    let tujuan = null;
    if(item.jenisOrder === 0){
      tujuan = {
          name: item.customerName + ', ' + item.customerAddress,
          value: {
            customer: item.customerName,
            address: item.customerAddress,
          }
      }
    } else {
      tujuan = {
        name: item.reseller.name + ', (RESELLER)',
        value: item.reseller
      }
    }
    let cumulativeDisc = 0;
    item.orderDetails.map((detail) => cumulativeDisc += (detail.diskonKhusus * detail.qty));  
    const object = {
      idOrderH: item.idOrderH,
      orderDate: new Date(item.orderDate).toLocaleDateString('id-ID'),
      tujuan: tujuan,
      price: (item.totalPrice + item.discount) + cumulativeDisc,
      netPrice: item.totalPrice,
      status: item.status,
    };
    view.push(object); 
  });
  dispatch({
      type: 'LOAD_ALL_ORDER_SUCCESS',
      payload: view,
      totalRow: payload.rows,
      index: index,
  })
}

const loadAllOrderFail = (dispatch, message) => {
  dispatch({
      type: 'loadAllProductSuccess',
      payload: message,
  })
}

export const loadOrderById = (object) => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_ORDERBYID' });
    axios.get(`http://localhost:8088/RDSdev/orderH/getOneOrderH/${object.idOrderH}`)
    .then(response =>{ 
        const data = response.data.datas;
        const detail = data.orderDetails.map(item => {
          const cumulativeDisc = item.qty * item.diskonKhusus;
            return {
                idProduct: item.idProduct,
                productName: item.product.productName,
                price: data.jenisOrder > 0 ? item.product.sellerPrice : item.product.productPrice,
                qty: item.qty,
                diskonKhusus: item.diskonKhusus,
                subtotal: ((data.jenisOrder > 0 ? item.product.sellerPrice : item.product.productPrice) * item.qty) - cumulativeDisc
            }
        })
        console.log('detailOrder', detail);
        loadOrderByIdSuccess(dispatch, detail, data);
    })
    .catch(error => {
      console.log(error);
      loadOrderByIdFail(dispatch, error.toString())
    });
  }
}

export const saveOrder = (details, header, user) => {
  const detailOrder = () => details.map(item => {
    return {
      idProduct: item.idProduct,
      info: '',
      qty: parseInt(item.qty),
      diskonKhusus: parseInt(item.diskonKhusus)
    }
  });
  const body = {
    idOrderH: header.idOrderH,
    orderDate: header.orderDate,
    idUser: user.idUser,
    customerName: header.customerName,
    customerAddress: header.customerAddress,
    totalPrice: header.totalPrice,
    discount: parseInt(header.discount),
    paymentReceipt: ' ',
    courierReceipt: ' ',
    status: header.status.value,
    information: '',
    idReseller: header.reseller.value.idUser,
    ongkir: parseInt(header.ongkir),
    jenisOrder: header.isReseller ? 1 : 2,
    orderDetails: detailOrder(),
  }

  console.log(body);
  return (dispatch) => {
        dispatch({ type: 'SAVE_ORDER' });
        axios.post(`http://localhost:8088/RDSdev/orderH/add`, body)
        .then(response =>{ 
            console.log('sukses save', response);
            saveOrderSuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            saveOrderFail(dispatch, error.toString());
        });
    }
}

const saveOrderSuccess = (dispatch) => {
  dispatch({
      type: 'SAVE_ORDER_SUCCESS'
  })
}

const saveOrderFail = (dispatch, message) => {
  dispatch({
      type: 'SAVE_ORDER_FAIL',
      payload: message,
  })
}

export const orderValidationError = (message) => {
  return {
      type: 'SAVE_ORDER_FAIL',
      payload: message,
  }
}

export const loadUserOrder = () => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_USER_ORDER'});
    axios.get(`http://localhost:8088/RDSdev/user/getAllUser`)
    .then(response => {
        const data = response.data;
        loadUserSuccess(dispatch, data.datas);
    })
    .catch(error => {
        console.log(error);
    })
  };
}

const loadUserSuccess = (dispatch, data) => {
  const combo = () => data.map((item) => {
    return {
      label: item.name,
      value: item,
    };
  })

  dispatch({
    type: 'LOAD_USER_ORDER_SUCCESS',
    payload: combo(),
  })
}

export const loadProductOrder = () => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_USER_ORDER'});
    axios.get(`http://localhost:8088/RDSdev/product/getAllProduct`)
    .then(response => {
        const data = response.data;
        loadProductSuccess(dispatch, data.datas);
    })
    .catch(error => {
        console.log(error);
    })
  };
}

const loadProductSuccess = (dispatch, data) => {
  const combo = () => data.map((item) => {
    return {
      label: item.productName,
      value: item,
    };
  })

  dispatch({
    type: 'LOAD_PRODUCT_ORDER_SUCCESS',
    payload: combo(),
  })
}


export const setDetailOrder = (details) => {
  let totalPrice = 0;
  details.map(item => totalPrice+= item.subtotal)
  return {
      type: 'setDetail',
      payload: details,
      total: totalPrice,
  };
};

export const setModalOrder = (modalForm) => {
  return {
      type: 'setModalOrder',
      payload: modalForm
  }
}

export const resetOrder = () => {
  console.log('reset order');
  return {
      type: 'resetThisOrder',
  }
}

const loadOrderByIdSuccess = (dispatch, detail, header) => {
    let reseller = null;
    if(header.jenisOrder > 0) {
      reseller = {
        label: header.reseller.name,
        value: header.reseller,
      };
    };
    // console.log(header);
    const modalForm = {
      idOrderH: header.idOrderH,
      orderDate: new Date(header.orderDate),
      isReseller: header.jenisOrder > 0 ? true : false,
      admin: {
        label: header.user.name,
        value: header.user,
      },
      reseller: reseller,
      customerName: header.customerName,
      customerAddress: header.customerAddress,
      totalPrice: header.totalPrice,
      discount: header.discount,
      ongkir: header.ongkir,
      status: {
          label: header.status,
          value: header.status,
      },
      courierReceipt: null,
      paymentReceipt: null,
    }
    
    dispatch({
        type: 'LOAD_ORDERBYID_SUCCESS',
        header: modalForm,
        details: detail
    })
}

const loadOrderByIdFail = (dispatch, data) => {
  dispatch({
      type: 'LOAD_ORDERBYID_FAIL',
      payload: data,
  })
}

export const deleteOrder = (item) => {
  return (dispatch) => {
      dispatch({ type: 'SAVE_PRODUCT' });
      axios.get(`http://localhost:8088/RDSdev/orderH/delete/` + item.idOrderH)
      .then(response =>{ 
        saveOrderSuccess(dispatch, response.data.datas);
      })
      .catch(error => {
          console.log(error.response);
          saveOrderFail(dispatch, error.toString());
      });
  }
}
