const INITIAL_STATE = {
    loading: false,
    error: null,
    pages: 0,
    currentPage: 1,
    doneSave: false,
    saveLoading: false,
    categoryList: [],
    modalData: {
        idCategory: null,
        categoryName: null,
    }
}

const CategoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORY':
            return { ...state, loading: true, error: null };
        case 'LOAD_CATEGORY_SUCCESS':
            return { ...state, loading: false, categoryList: action.payload, pages: action.totalRow, currentPage: action.index };
        case 'LOAD_CATEGORY_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'SAVE_CATEGORY':
            return { ...state, saveLoading: true, error: null };
        case 'SAVE_CATEGORY_SUCCESS':
            return { ...state, saveLoading: false, doneSave: true };
        case 'SAVE_CATEGORY_FAIL':
            return { ...state, saveLoading: false, doneSave: false, error: action.payload };    
        case 'LOAD_CATEGORYBYID':
            return { ...state, loading: true, error: null };
        case 'LOAD_CATEGORYBYID_SUCCESS':
            return { ...state, loading: false, modalData: action.payload };
        case 'LOAD_CATEGORYBYID_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'SET_MODAL_CATEGORY':
            return { ...state, modalData: action.payload };
        case 'RESET_MODAL_CATEGORY':
            return { ...state, modalData: INITIAL_STATE.modalData };    
        case 'RESET_MASTER_CATEGORY':
            return INITIAL_STATE;
        default:
            return state;
    }
} 

export default CategoryReducer;