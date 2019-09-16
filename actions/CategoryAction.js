import axios from 'axios';

export const loadCategory = (index) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_CATEGORY'});
        axios.get(`http://localhost:8088/RDSdev/category/getAllCategory/${index-1}`)
        .then(response => {
            const data = response.data;
            loadCategorySuccess(dispatch, data, index);
        })
        .catch(error => {
            loadCategoryFail(dispatch, error.toString());
        })
    };
};

const loadCategorySuccess = (dispatch, data, index) => {
    const payload = () => (data.datas.map((item) => {
        return item;
    }));

    dispatch({
        type: 'LOAD_CATEGORY_SUCCESS',
        payload: payload(),
        totalRow: data.rows,
        index,
    });
}

const loadCategoryFail = (dispatch, message) => {
    dispatch({
        type: 'LOAD_CATEGORY_FAIL',
        payload: message,
    })
}

export const loadCategoryById = (item) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_CATEGORYBYID'});
        axios.get(`http://localhost:8088/RDSdev/category/getOneCategory/${item.idCategory}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            loadCategoryByIdSuccess(dispatch, data.datas);
        })
        .catch(error => {
            loadCategoryByIdFail(dispatch, error.toString());
        })
    };
};

const loadCategoryByIdSuccess = (dispatch, data) => {
    dispatch({
        type: 'LOAD_CATEGORYBYID_SUCCESS',
        payload: data,
    })
}

const loadCategoryByIdFail = (dispatch, message) => {
    dispatch({
        type: 'LOAD_CATEGORYBYID_FAIL',
        payload: message,
    })
}

export const saveCategory = (item) => {
    console.log('save item', item);
    return (dispatch) => {
        dispatch({ type: 'SAVE_CATEGORY'});
        axios.post(`http://localhost:8088/RDSdev/category/add`, item)
        .then(response => {
            console.log(response);
            saveCategorySuccess(dispatch);
        })
        .catch(error => {
            console.log(error);
            console.log(error.response);
            saveCategoryFail(dispatch, error.toString());
        })
    };
};

export const deleteCategory = (item) => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_CATEGORY' });
        axios.get(`http://localhost:8088/RDSdev/category/activation/` + item.idCategory)
        .then(response =>{ 
          saveCategorySuccess(dispatch, response.data.datas);
        })
        .catch(error => {
            console.log(error.response);
            saveCategoryFail(dispatch, error.toString());
        });
    }
  }

const saveCategorySuccess = (dispatch) => {
    dispatch({
        type: 'SAVE_CATEGORY_SUCCESS',
    })
}

const saveCategoryFail = (dispatch, message) => {
    dispatch({
        type: 'SAVE_CATEGORY_FAIL',
        payload: message,
    })
}

export const throwError = (message) => {
    return {
        type: 'SAVE_CATEGORY_FAIL',
        payload: message,
    }
}

export const setModalCategory = (modalForm) => {
    return {
        type: 'SET_MODAL_CATEGORY',
        payload: modalForm
    };
};

export const resetModalCategory = (modalForm) => {
    return {
        type: 'RESET_MODAL_CATEGORY',
        payload: modalForm
    };
};

export const resetMasterCategory = () => {
    return {
        type: 'RESET_MASTER_CATEGORY',
    };
};