const months=[
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const date = new Date();
const INITIAL_STATE = {
    date: {
        label: '1',
        value: '01',
    },
    month: {
        label: months[date.getMonth() + 1],
        value: date.getMonth() + 1,
    },
    year: {
        label: date.getFullYear(),
        value: date.getFullYear(),
    },
    labels: [],
    reportData: [],
    dataset: [],
    loading: false,
    userList: [],
    productList: [],
    selectedUser: {
        label: 'Semua',
        value: null,
    },
    selectedProduct: {
        label: '',
        value: null,
    }
}

const ReportReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_YEARLY_REPORT':
            return { ...state, loading: true };
        case 'GET_YEARLY_REPORT_SUCCESS':
            return { ...state, loading: false, reportData: action.payload, dataset: action.dataset };
        case 'GET_MONTHLY_REPORT':
            return { ...state, loading: true };
        case 'GET_MONTHLY_REPORT_SUCCESS':
            return { ...state, loading: false, reportData: action.payload, dataset: action.dataset, labels: action.labels };
        case 'GET_DAILY_REPORT':
            return { ...state, loading: true };
        case 'GET_DAILY_REPORT_SUCCESS':
            return { ...state, loading: false, reportData: action.payload };
        case 'GET_MONTHLY_EXPENSES_REPORT':
            return { ...state, loading: true };
        case 'GET_MONTHLY_EXPENSES_REPORT_SUCCESS':
            return { ...state, loading: false, reportData: action.payload };
        case 'GET_REJECT_REPORT':
            return { ...state, loading: true };
        case 'GET_REJECT_REPORT_SUCCESS':
            return { ...state, loading: false, reportData: action.payload };
        case 'GET_MONTHLY_STOCK_REPORT':
            return { ...state, loading: true };
        case 'GET_STOCK_REPORT_SUCCESS':
            return { ...state, loading: false, reportData: action.payload };
        case 'LOAD_USER_REPORT':
            return { ...state, loading: true };
        case 'LOAD_USER_REPORT_SUCCESS':
            return { ...state, loading: false, userList: action.payload };
        case 'SELECT_USER_REPORT':
            return { ...state, selectedUser: action.payload };
        case 'SET_DATE':
            return { ...state, date: action.payload };
        case 'SET_MONTH':
            return { ...state, month: action.payload };
        case 'SET_YEAR':
            return { ...state, year: action.payload };
        case 'LOAD_PRODUCT_REPORT':
            return { ...state, loading: true };
        case 'LOAD_PRODUCT_REPORT_SUCCESS':
            return { ...state, loading: false, productList: action.payload };
        case 'SELECT_PRODUCT_REPORT':
            return { ...state, selectedProduct: action.payload };
        default:
            return state;
    }
}

export default ReportReducer;