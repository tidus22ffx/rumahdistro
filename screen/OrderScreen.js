import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
getImgurToken,
loadProductOrder,
loadUserOrder,
setModalOrder,
setDetailOrder,
loadAllOrder,
resetOrder,
saveOrder,
orderValidationError,
loadOrderById,
deleteOrder,
} from '../actions';
import Dashboard from './Dashboard';
import { OrderContent, OrderPopup } from '../component/Order';

// modalData: {
//     transaksi: null,
//     product: null,
//     qty: 0,
//     status: null,
// },

const initial_state={
    selectedProduct: null,
    inputQty: 0,
    popupOpen: false,
    promptDelete: false,
    diskonKhusus: 0,
    filterDate: null,
}

class OrderScreen extends Component {

    state = initial_state;

    componentWillMount(){
        this.props.getImgurToken();
    }

    componentDidMount(){
        this.props.loadProductOrder();
        this.props.loadUserOrder();
        this.props.loadAllOrder(1);
    }

    reset(){
        this.props.resetOrder();
        this.props.loadProductOrder();
        this.props.loadUserOrder();
        this.props.loadAllOrder(1);
    }

    addDetail(){
        const details = this.props.detailData;
        const {selectedProduct, inputQty, diskonKhusus} = this.state;
        console.log('isReseller', selectedProduct);
        if(this.props.modalData.isReseller){
            const cumulativeDisc = inputQty * diskonKhusus;
            const item = {
                idProduct: selectedProduct.value.idProduct,
                productName: selectedProduct.value.productName,
                price: selectedProduct.value.sellerPrice,
                qty: inputQty,
                diskonKhusus: diskonKhusus,
                subtotal: (selectedProduct.value.sellerPrice * inputQty) - cumulativeDisc,
            };
            details.push(item);
        } else {
            const item = {
                idProduct: selectedProduct.value.idProduct,
                productName: selectedProduct.value.productName,
                price: selectedProduct.value.normalPrice,
                qty: inputQty,
                diskonKhusus: 0,
                subtotal: (selectedProduct.value.normalPrice * inputQty) 
            };
            details.push(item);
        }
        this.props.setDetailOrder(details);
        this.setState({ ...this.state, selectedProduct: null, inputQty: 0});
    }

    viewItem(item){
        const date = new Date(item.orderDate).getTime();
        const data = {...item, orderDate: date};
        this.props.loadOrderById(data);
        this.togglePopup(true);
    }

    removeDetail(key){
        const details = this.props.detailData;
        const newDetails = details.filter ((item, index) => index !== key);
        this.props.setDetailOrder(newDetails);
    }

    inputQuantity(qty){
        let quantity = qty;
        if(quantity > this.state.selectedProduct.value.productStock){
            quantity = this.state.selectedProduct.value.productStock
        }
        this.setState({ 
            inputQty: quantity
        });
    }

    componentDidUpdate(){
        if(this.props.doneSave){
            this.togglePopup(false);
        }
    }

    setModalState(modalForm){
        this.props.setModalOrder(modalForm);
    }

    deleteItem(){
        this.props.deleteOrder(this.props.modalData);
    }

    togglePopup(status){
        this.reset();
        this.setState({popupOpen: status});
    }

    filterByDate(date){
        this.setState({filterDate: date});
        let d;
        if(date === null){
            d = null;
        } else {
            d = new Date(date).getTime();
        }
        this.props.loadAllOrder(1, d);
    }

    validation(){
        const { orderDate, isReseller, reseller, customerName,
                customerAddress } = this.props.modalData;
        const { detailData } = this.props;

        if(detailData.length > 0 && orderDate){
            if(isReseller && !reseller){
                this.props.orderValidationError('Silahkan isi kolom reseller.');
                return false;
            }

            if(!isReseller && (!customerName || !customerAddress)){
                this.props.orderValidationError('Silahkan isi kolom customer.');
                return false;
            }
            
            return true;
        }
        this.props.orderValidationError('Data belum lengkap. Silahkan periksa kolom tanggal dan daftar produk.');
        return false;
    }

    saveButton(){
        //console.log(this.props.location);
        //this.props.saveRejection(this.state.modalData, 0);
        if(this.validation()){
            const details = this.props.detailData;
            const header = this.props.modalData;
            const user = JSON.parse(sessionStorage.getItem('userData'));
            this.props.saveOrder(details, header, user);
        }
    }

    renderPagination(totalRows, currentPage=1){
        const maxRow=5;
        const maxPage=5;
        const totalPages = Math.ceil(totalRows / maxRow);


        if(currentPage < 1  ){
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage = 1;
        let endPage = 1;

        if(totalPages <= maxPage){
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforeCurrentPage =  Math.floor(maxPage / 2);
            const maxPagesAfterCurrentPage =  Math.ceil(maxPage / 2) - 1;
            if(currentPage <= maxPagesBeforeCurrentPage){
                startPage = 1;
                endPage = maxPage;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages){
                startPage = totalPages - maxPage + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        const startIndex = (currentPage - 1);

        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        return {
            currentPage: currentPage,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            pages: pages,
        }
    }

    render(){
        return(
            <Dashboard 
                modalWidth = '60%'
                modalContent={<OrderPopup 
                    modalData={this.props.modalData} 
                    modalFunction={(modalForm) => this.setModalState(modalForm)}
                    products={this.props.productList}
                    users={this.props.userList}
                    selectedProduct={this.state.selectedProduct}
                    selectProduct={(product) => {console.log(product);this.setState({selectedProduct:product})}}
                    inputedQty={this.state.inputQty}
                    inputQty={(value) => this.inputQuantity(value)}
                    diskonKhusus={this.state.diskonKhusus}
                    inputDiskonKhusus={(value) => this.setState({diskonKhusus: value})}
                    saveAction={() => this.saveButton()}
                    loading={this.props.saveLoading}
                    error={this.props.error}
                    detailList={this.props.detailData}
                    addDetail={() => this.addDetail()}
                    deleteFunction={() => this.deleteItem()}
                    promptDelete={this.state.promptDelete}
                    deleteMessage={(val) => this.setState({ promptDelete: val})}
                    removeDetail={(index) => this.removeDetail(index)}
                />} 
                viewContent={<OrderContent 
                    data={this.props.orderList}
                    paging={this.renderPagination(this.props.pages, this.props.currentPage)}
                    pageFunction={(index) => this.props.loadAllOrder(index, this.state.filterDate)}
                    currentPage={this.props.currentPage}
                    popupState={this.props.popupState}
                    loading={this.props.loading}
                    viewItem={(item) => this.viewItem(item)}
                    filterDate={this.state.filterDate}
                    clearSearch={() => this.filterByDate(null)}
                    changeFilterDate={(date) => this.filterByDate(date)}
                />}
                popupOpen={this.state.popupOpen}
                toggle={(status) => this.togglePopup(status)}
                history={this.props.history} 
            />
        )
    }
}

const mapStateToProps = ({orderData}) => {
    return orderData;
}

export default connect(mapStateToProps, {
    getImgurToken,
    loadProductOrder,
    loadUserOrder,
    setModalOrder,
    setDetailOrder,
    loadAllOrder,
    resetOrder,
    saveOrder,
    orderValidationError,
    loadOrderById,
    deleteOrder,
})(OrderScreen);