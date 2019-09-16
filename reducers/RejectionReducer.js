const INITIAL_STATE = {
    loading: false,
    pages: 0,
    currentPage: 1,
    error: null,
    rejectionList: [],
    productList: null,
    transactionList: null,
    doneSave: false,
    modalData: {
        idReject: null,
        rejectDate: new Date().getTime(),
        product: null,
        qty: 0,
        rejectType: null,
        status: null,
    },
}

export const RejectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'setModalState':
            return {...state, modalData: action.payload};
        case 'loadReject':
            return {...state, loading: true, error: null};
        case 'loadRejectFail':
            return {...state, loading: false, error: action.payload};
        case 'loadRejectSuccess':
            return {...state, loading: false, rejectionList: action.payload, pages: action.totalRow, currentPage: action.index };
        case 'loadTransaksi':
            return {...state, error: null};
        case 'loadTransaksiFail':
            return {...state, loading: false, error: action.payload};
        case 'loadTransaksiSuccess':
            return {...state, loading: false, transactionList: action.payload, error: null};
        case 'loadTransaksi':
            return {...state, error: null};
        case 'loadProduct':
            return {...state, loading: true, error: null};    
        case 'loadProductFail':
            return {...state, loading: false, error: action.payload};
        case 'loadProductSuccess':
            return {...state, loading: false, productList: action.payload, error: null};
        case 'saveReject':
            return {...state, loading: true, error: null};    
        case 'saveRejectFail':
            return {...state, loading: false, error: action.payload};
        case 'saveRejectSuccess':
            return {...state, loading: false, productList: action.payload, error: null, doneSave: true};        
        case 'LOAD_REJECTBYID':
            return { ...state, loading: true, error: null };
        case 'LOAD_REJECTBYID_SUCCESS':
            return { ...state, loading: false, modalData: action.payload };
        case 'LOAD_REJECTBYID_FAIL':
            return { ...state, loading: false, error: action.payload };            
        case 'resetRejection':
            return INITIAL_STATE;
        case 'resetRejectionPopup':
            return { ...state, modalData: INITIAL_STATE.modalData };
        default:
            return state;
    }
}

export default RejectionReducer;