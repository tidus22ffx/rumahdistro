import { loadProduct } from "../actions";
import { resetPurchase } from "../actions/PurchaseAction";

const INITIAL_STATE = {
    loading: false,
    error: null,
    pages: 1,
    currentPage: 1,
    operationalList: [],
    userList: [],
    doneSave: false,
    saveLoading: false,
    modalData: {
        idOperationalH: null,
        orderDate: new Date().getTime(),
        totalPrice: 0,
        selectedUser: null,
    },
    detailData: [],
}

const OperationalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_OPERATIONAL':
            return { ...state, loading: true, error: null };
        case 'LOAD_OPERATIONAL_SUCCESS':
            return { ...state, loading: false, operationalList: action.data, pages: action.totalRow, currentPage: action.index };
        case 'LOAD_OPERATIONAL_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOAD_OPERATIONALBYID':
            return { ...state, loading: true, error: null };
        case 'LOAD_OPERATIONALBYID_SUCCESS':
            return { ...state, loading: false, detailData: action.detail, modalData: action.payload };
        case 'LOAD_OPERATIONALBYID_FAIL':
            return { ...state, loading: false, error: action.payload };    
        
        //load list user
        case 'load_all_user_operational':
            return { ...state, loading: true, error: null };
        case 'load_all_user_operational_success':
            return { ...state, loading: false, userList: action.payload };
        case 'load_all_user_operational_fail':
            return { ...state, loading: false, error: action.payload };
        //////////////////////////////////////////////////////////

        case 'SAVE_OPERATIONAL':
            return { ...state, saveLoading: true, error: null };
        case 'SAVE_OPERATIONAL_SUCCESS':
            return { ...state, saveLoading: false, doneSave: true };
        case 'SAVE_OPERATIONAL_FAIL':
            return { ...state, saveLoading: false, error: action.payload };    
        case 'setModalOperational': 
            return { ...state, modalData: action.payload }
        case 'setDetailOperational':
            return { ...state, detailData: action.payload, modalData: { ...state.modalData, totalPrice: action.total}  };
        case 'RESET_OPERATIONAL':
            return { ...INITIAL_STATE, operationalList: state.operationalList, userList: state.userList };    
        default:
            return state;
    }
}

export default OperationalReducer;