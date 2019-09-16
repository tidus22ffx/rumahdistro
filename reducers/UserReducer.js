const INITIAL_STATE = {
    loading: false,
    error: null,
    pages: 0,
    currentPage: 1,
    doneSave: false,
    saveLoading: false,
    userList: [],
    modalData: {
        idUser: null,
        userid: null,
        name: null,
        email: null,
        phone: null,
        address: null,
        password: null,
    }
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_MASTER_USER':
            return { ...state, loading: true, error: null };
        case 'LOAD_MASTER_USER_SUCCESS':
            return { ...state, loading: false, userList: action.payload, pages: action.totalRow, currentPage: action.index };
        case 'LOAD_MASTER_USER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'SAVE_USER':
            return { ...state, saveLoading: true, error: null };
        case 'SAVE_USER_SUCCESS':
            return { ...state, saveLoading: false, doneSave: true };
        case 'SAVE_USER_FAIL':
            return { ...state, saveLoading: false, doneSave: false, error: action.payload };    
        case 'LOAD_USERBYID':
            return { ...state, loading: true, error: null };
        case 'LOAD_USERBYID_SUCCESS':
            return { ...state, loading: false, modalData: action.payload };
        case 'LOAD_USERBYID_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'SET_MODAL_USER':
            return { ...state, modalData: action.payload };
        case 'RESET_MASTER_USER':
            return INITIAL_STATE;
        default:
            return state;
    }
} 

export default UserReducer;