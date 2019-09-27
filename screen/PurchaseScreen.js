import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
loadAllProduct,
setModalPurchase,
setDetail,
loadAllPurchases,
resetPurchase,
savePurchase,
loadPurchaseById,
purchaseValidationError,
deletePurchase
} from '../actions';
import Dashboard from './Dashboard';
import { PurchaseContent, PurchasePopup } from '../component/Purchase';

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
    filterDate: null,
}

class PurchaseScreen extends Component {

    state = initial_state;

    componentDidMount(){
        this.props.loadAllProduct();
        this.props.loadAllPurchases(1);
        console.log(this.props);
    }

    addDetail(){
        const details = this.props.detailData;
        const item = {
            idProduct: this.state.selectedProduct.value.idProduct,
            productName: this.state.selectedProduct.value.productName,
            price: this.state.selectedProduct.value.productPrice,
            qty: this.state.inputQty,
            subtotal: (this.state.selectedProduct.value.productPrice * this.state.inputQty) 
        };
        details.push(item);
        this.props.setDetail(details);
        this.setState({ ...this.state, selectedProduct: null, inputQty: 0});
    }

    viewItem(item){
        console.log(item);
        const date = new Date(item.orderDate).getTime();
        const data = {...item, orderDate: date};
        this.props.loadPurchaseById(data);
        this.togglePopup(true);
    }

    removeDetail(key){
        const details = this.props.detailData;
        const newDetails = details.filter ((item, index) => index !== key);
        console.log(newDetails);
        this.props.setDetail(newDetails);
    }

    reset(){
        this.props.resetPurchase();
        this.props.loadAllProduct();
        this.props.loadAllPurchases(1);
    }

    componentDidUpdate(){
        if(this.props.doneSave){
            this.setState({popupOpen: false})
            this.props.resetPurchase();
            this.props.loadAllPurchases(1);
            this.props.loadAllProduct();
            console.log(this.state);
        }
    }

    setModalState(modalForm){
        this.props.setModalPurchase(modalForm);
    }

    togglePopup(status){
        this.reset();
        this.setState({popupOpen: status});
    }

    validation(){
        const { orderDate, totalPrice, discount } = this.props.modalData;
        const { detailData } = this.props;
        if(!orderDate || !totalPrice || discount === null || detailData.length < 1){
            this.props.purchaseValidationError('Silahkan isi semua kolom.');
            return false;
        }
        return true;
    }

    deleteItem(){
        this.props.deletePurchase(this.props.modalData);
    }

    filterByDate(date){
        this.setState({filterDate: date});
        let d;
        if(date === null){
            d = null;
        } else {
            d = new Date(date).getTime();
        }
        this.props.loadAllPurchases(1, d);
    }

    saveButton(){
        //console.log(this.props.location);
        //this.props.saveRejection(this.state.modalData, 0);
        if(this.validation()){
            const details = this.props.detailData;
            const header = this.props.modalData;
            this.props.savePurchase(details, header);
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
            console.log(maxPagesBeforeCurrentPage, maxPagesAfterCurrentPage );
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
        console.log(this.props);
        return(
            <Dashboard 
                modalWidth = '50%'
                modalContent={<PurchasePopup 
                    modalData={this.props.modalData} 
                    modalFunction={(modalForm) => this.setModalState(modalForm)}
                    products={this.props.productList}
                    selectedProduct={this.state.selectedProduct}
                    selectProduct={(product) => this.setState({selectedProduct:product})}
                    inputedQty={this.state.inputQty}
                    inputQty={(value) => this.setState({inputQty:value})}
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
                viewContent={<PurchaseContent 
                    data={this.props.purchaseList}
                    paging={this.renderPagination(this.props.pages, this.props.currentPage)}
                    pageFunction={(index) => this.props.loadAllPurchases(index, this.state.filterDate)}
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

const mapStateToProps = ({purchaseData}) => {
    return purchaseData;
}

export default connect(mapStateToProps, {
    loadAllProduct,
    setDetail, 
    loadAllPurchases,
    resetPurchase,
    setModalPurchase,
    savePurchase,
    loadPurchaseById,
    purchaseValidationError,
    deletePurchase
})(PurchaseScreen);