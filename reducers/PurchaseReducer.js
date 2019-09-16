import { loadProduct } from "../actions";
import { resetPurchase } from "../actions/PurchaseAction";

const INITIAL_STATE = {
    loading: false,
    error: null,
    pages: 0,
    currentPage: 1,
    purchaseList: [],
    productList: null,
    doneSave: false,
    saveLoading: false,
    modalData: {
        idPurchaseH: null,
        orderDate: new Date().getTime(),
        totalPrice: 0,
        discount: 0,
    },
    detailData: [],
}

const PurchaseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_PURCHASE':
            return { ...state, loading: true, error: null };
        case 'LOAD_PURCHASE_SUCCESS':
            return { ...state, loading: false, purchaseList: action.data, pages: action.totalRow, currentPage: action.index };
        case 'LOAD_PURCHASE_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOAD_PURCHASEBYID':
            return { ...state, loading: true, error: null };
        case 'LOAD_PURCHASEBYID_SUCCESS':
            return { ...state, loading: false, detailData: action.detail, modalData: action.header };
        case 'LOAD_PURCHASEBYID_FAIL':
            return { ...state, loading: false, error: action.payload };    
        case 'loadAllProduct':
            return { ...state, loading: true, error: null };
        case 'loadAllProductSuccess':
            return { ...state, loading: false, productList: action.payload };
        case 'loadAllProductFail':
            return { ...state, loading: false, error: action.payload };
        case 'SAVE_PURCHASE':
            return { ...state, saveLoading: true, error: null };
        case 'SAVE_PURCHASE_SUCCESS':
            return { ...state, saveLoading: false, doneSave: true };
        case 'SAVE_PURCHASE_FAIL':
            return { ...state, saveLoading: false, error: action.payload };    
        case 'setModalPurchase': 
            return { ...state, modalData: action.payload }
        case 'setDetail':
            console.log(action.payload);
            return { ...state, detailData: action.payload, modalData: { ...state.modalData, totalPrice: action.total}  };
        case 'resetPurchase':
            return {  ...INITIAL_STATE, detailData: [], purchaseList: state.purchaseList, productList: state.productList, };    
        default:
            return state;
    }
}

export default PurchaseReducer;