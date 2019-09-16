const INITIAL_STATE = {
    loading: false,
    error: null,
    pages: 0,
    currentPage: 1,
    orderList: [],
    productList: [],
    userList: [],
    doneSave: false,
    saveLoading: false,
    modalData: {
        idOrderH: null,
        orderDate: new Date().getTime(),
        isReseller: true,
        admin: null,
        reseller: null,
        customerName: null,
        customerAddress: null,
        totalPrice: 0,
        discount: 0,
        ongkir: 0,
        status: {
            label: 'Dipesan',
            value: 'dipesan',
        },
        courierReceipt: null,
        paymentReceipt: null,
    },
    detailData: [],
}

const OrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_ALL_ORDER':
            return { ...state, loading: true, error: null };
        case 'LOAD_ALL_ORDER_SUCCESS':
            return { ...state, loading: false, orderList: action.payload, pages: action.totalRow, currentPage: action.index };
        case 'LOAD_ALL_ORDER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOAD_ORDERBYID':
            return { ...state, loading: true, error: null };
        case 'LOAD_ORDERBYID_SUCCESS':
            return { ...state, loading: false, detailData: action.details, modalData: action.header };
        case 'LOAD_ORDERBYID_FAIL':
            return { ...state, loading: false, error: action.payload };    
        case 'LOAD_PRODUCT_ORDER':
            return { ...state, loading: true, error: null };
        case 'LOAD_PRODUCT_ORDER_SUCCESS':
            return { ...state, loading: false, productList: action.payload };
        case 'LOAD_PRODUCT_ORDER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOAD_USER_ORDER':
            return { ...state, loading: true, error: null };
        case 'LOAD_USER_ORDER_SUCCESS':
            return { ...state, loading: false, userList: action.payload };
        case 'LOAD_USER_ORDER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'SAVE_ORDER':
            return { ...state, saveLoading: true, error: null };
        case 'SAVE_ORDER_SUCCESS':
            return { ...state, saveLoading: false, doneSave: true };
        case 'SAVE_ORDER_FAIL':
            return { ...state, saveLoading: false, error: action.payload };    
        case 'setModalOrder': 
            return { ...state, modalData: action.payload }
        case 'setDetail':
            return { ...state, detailData: action.payload, modalData: { ...state.modalData, totalPrice: action.total}  };
        case 'resetThisOrder':
            return { ...INITIAL_STATE, detailData: [], orderList: state.orderList, productList: state.productList };    
        default:
            return state;
    }
}

export default OrderReducer;