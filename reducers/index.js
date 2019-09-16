import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import RejectionReducer from './RejectionReducer';
import PurchaseReducer from './PurchaseReducer';
import OperationalReducer from './OperationalReducer';
import ProductReducer from './ProductReducer';
import CategoryReducer from './CategoryReducer';
import UserReducer from './UserReducer';
import OrderReducer from './OrderReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({
    loginData: LoginReducer,
    rejectData: RejectionReducer,
    purchaseData: PurchaseReducer,
    operationalData: OperationalReducer,
    productData: ProductReducer,
    categoryData: CategoryReducer,
    userData: UserReducer,
    orderData: OrderReducer,
    reportData: ReportReducer,
});