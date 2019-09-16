import axios from 'axios';

export const loadAllJenisProduct = () => {
    return (dispatch) => {
        dispatch({ type: 'load_all_jenis_product' });
        //console.log(API_GET_CUSTOMER);
        axios.get('http://localhost:8088/RDSdev/category/getAllCategory')
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log(data);
            loadAllJenisProductSuccess(dispatch, data.datas);
          } else {
            console.log('fail');
            loadAllJenisProductFail(dispatch, 'Invalid Credential');
          }
        })
        .catch(err => {
          console.log(err);
          loadAllJenisProductFail(dispatch, err);
        });
    }
}

const loadAllJenisProductSuccess = (dispatch, payload) => {
    let data = [];
    payload.map((item) => {
        const ret = {
            label: item.categoryName,
            value: item,
        }
        data.push(ret);
    });
    dispatch({
        type: 'load_all_jenis_product_success',
        payload: data,
    })
}

const loadAllJenisProductFail = (dispatch, data) => {
    dispatch({
        type: 'load_all_jenis_product_fail',
        payload: data,
    })
}

export const loadAllProductMaster = (index) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_PRODUCT_MASTER' });
        axios.get(`http://localhost:8088/RDSdev/product/getAllProduct/${index-1}`)
        .then(response => {
          const data = response.data;
          if (data.status === 200) {
            console.log('success', data);
            loadProductMasterSuccess(dispatch, data, index);
          } else {
            console.log('fail');
            loadProductMasterFail(dispatch, 'Bad Request');
          }
        })
        .catch(err => {
          console.log(err);
          loadProductMasterFail(dispatch, err);
        });
    }
}

const loadProductMasterSuccess = (dispatch, data, index) => {
    const payload = () => (data.datas.map(item => {
        return {
            idProduct: item.idProduct,
            productJenis: item.categoryName,
            productName: item.productName,
            productPrice: item.productPrice,
			normalPrice: item.normalPrice,
            sellerPrice: item.sellerPrice,
            stock: item.productStock
        }
    }));
    dispatch({
        type: 'LOAD_PRODUCT_MASTER_SUCCESS',
        payload: payload(),
        index,
        totalRow: data.rows,
    })
}

const loadProductMasterFail = (dispatch, data) => {
    dispatch({
        type: 'LOAD_PRODUCT_MASTER_FAIL',
        payload: data,
    })
}

export const loadProductById = (item) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_PRODUCTBYID' });
        axios.get(`http://localhost:8088/RDSdev/product/getOneProd/${item.idProduct}`)
        .then(response =>{ 
            console.log(response);
            loadProductByIdSuccess(dispatch, response.data.datas);
        })
        .catch(error => console.log(error));
    }
}

const loadProductByIdSuccess = (dispatch, data) => {
    console.log(data);
    dispatch({
        type: 'LOAD_PRODUCTBYID_SUCCESS',
        payload: {
            idProduct: data.idProduct,
            productName: data.productName,
            productPrice: data.productPrice,
            sellerPrice: data.sellerPrice,
			normalPrice: data.normalPrice,
            stock: data.productStock,
        },
        jenisProduct: {
            label: data.categoryName,
            value: {
                idCategory: data.idCategory,
                categoryName: data.categoryName
            }
        }
    })
}

const loadProductByIdFail = (dispatch, data) => {
    dispatch({
        type: 'LOAD_PRODUCTID_FAIL',
        payload: data,
    })
}

export const setModalProduct = (modalForm) => {
    return {
        type: 'setModalProduct',
        payload: modalForm
    }
}

export const resetMasterProduct = () => {
    return {
        type: 'resetProduct',
    }
}

export const setProductJenisProduct = (jenis) => {
    return {
        type: 'set_product_jenis_product',
        payload: jenis
    }
}

export const saveProduct = (item, jenis) => {
    console.log(jenis);
    return (dispatch) => {
        dispatch({ type: 'SAVE_PRODUCT' });
        axios.post(`http://localhost:8088/RDSdev/product/add`, {
            "idProduct": item.idProduct,
            "idCategory": jenis.idCategory,
            "productName": item.productName,
            "productPrice": item.productPrice,
			"normalPrice": item.normalPrice,
            "productStock": item.stock,
            "sellerPrice": item.sellerPrice
        })
        .then(response =>{ 
            console.log('sukses save', response);
            saveProductSuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            saveProductFail(dispatch, error.toString());
        });
    }
}

const saveProductSuccess = (dispatch) => {
    dispatch({
        type: 'SAVE_PRODUCT_SUCCESS'
    })
}

const saveProductFail = (dispatch, message) => {
    dispatch({
        type: 'SAVE_PRODUCT_FAIL',
        payload: message,
    })
}

export const productValidationError = (message) => {
    return {
        type: 'SAVE_PRODUCT_FAIL',
        payload: message,
    }
}

export const deleteProduct = (item) => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_PRODUCT' });
        axios.get(`http://localhost:8088/RDSdev/product/activation/` + item.idProduct)
        .then(response =>{ 
            saveProductSuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            saveProductFail(dispatch, error.toString());
        });
    }
}