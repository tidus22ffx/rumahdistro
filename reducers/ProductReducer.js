const INITIAL_STATE = {
    loading: false,
    error: null,
    pages: 0,
    currentPage: 1,
    jenisProductList: [],
    productList: [],
    doneSave: false,
    saveLoading: false,
    selectedJenisProduct: {
        id: '',
        jenis: '',
    },
    modalData: {
        idProduct: null,
        productName: null,
        productPrice: 0,
        sellerPrice: 0,
        stock: 0,
    },
}

const PurchaseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_PRODUCT_MASTER':
            return { ...state, loading: true, error: null };
        case 'LOAD_PRODUCT_MASTER_SUCCESS':
            return { ...state, loading: false, productList: action.payload, pages: action.totalRow, currentPage: action.index };
        case 'LOAD_PRODUCT_MASTER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOAD_PRODUCTBYID':
            console.log('masuk');
            return { ...state, loading: true, error: null };
        case 'LOAD_PRODUCTBYID_SUCCESS':
            return { ...state, loading: false, selectedJenisProduct: action.jenisProduct, modalData: action.payload };
        case 'LOAD_PRODUCTBYID_FAIL':
            return { ...state, loading: false, error: action.payload };    
        case 'load_all_jenis_product':
            return { ...state, loading: true, error: null };
        case 'load_all_jenis_product_success':
            return { ...state, loading: false, jenisProductList: action.payload };
        case 'load_all_jenis_product_fail':
            return { ...state, loading: false, error: action.payload };
        case 'SAVE_PRODUCT':
            return { ...state, saveLoading: true, error: null };
        case 'SAVE_PRODUCT_SUCCESS':
            return { ...state, saveLoading: false, doneSave: true };
        case 'SAVE_PRODUCT_FAIL':
            return { ...state, saveLoading: false, error: action.payload };    
        case 'setModalProduct': 
            return { ...state, modalData: action.payload }
        case 'resetProduct':
            return { purchaseList: state.purchaseList, productList: state.productList, ...INITIAL_STATE };    
        case 'set_product_jenis_product':
            return { ...state, selectedJenisProduct: action.payload };        
        default:
            return state;
    }
}

export default PurchaseReducer;