import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    loadAllUserOperational,
    setDetailOperational,
    loadAllOperational,
    loadOperationalById,
    setModalOperational,
    saveOperational,
    resetOperational,
    operationalValidationError,
    deleteOperational
} from '../actions';
import Dashboard from './Dashboard';
import { OperationalPopup, OperationalContent } from '../component/Operational';

// modalData: {
//     transaksi: null,
//     product: null,
//     qty: 0,
//     status: null,
// },

const initial_state={
    //selectedUser: null,
    inputProduct: null,
    inputPrice: 0,
    inputQty: 0,
    popupOpen: false,
    promptDelete: false,
    filterDate: null,
}

class OperationalScreen extends Component {

    state = initial_state;

    componentDidMount(){
        this.props.loadAllUserOperational();
        this.props.loadAllOperational(1);
    }

    addDetail(){
        const details = this.props.detailData;
        const item = {
            productName: this.state.inputProduct,
            price: this.state.inputPrice,
            qty: this.state.inputQty,
            subtotal: (this.state.inputPrice * this.state.inputQty) 
        };
        details.push(item);
        this.props.setDetailOperational(details);
        this.setState({ ...this.state, inputProduct: null, inputPrice: 0, inputQty: 0});
    }

    viewItem(item){
        const date = new Date(item.orderDate).getTime();
        const data = {...item, orderDate: date};
        this.props.loadOperationalById(data);
        this.togglePopup(true);
    }

    removeDetail(key){
        const details = this.props.detailData;
        const newDetails = details.filter ((item, index) => index !== key);
        console.log(newDetails);
        this.props.setDetailOperational(newDetails);
    }

    componentDidUpdate(){
        if(this.props.doneSave){
            this.setState({popupOpen: false})
            this.reset();
            console.log(this.state);
        }
    }

    reset(){
        this.props.resetOperational();
        this.props.loadAllOperational(1);
        this.props.loadAllUserOperational();
    }

    setModalState(modalForm){
        this.props.setModalOperational(modalForm);
    }

    togglePopup(status){
        this.reset();
        this.setState({popupOpen: status});
    }
    
    deleteItem(){
        this.props.deleteOperational(this.props.modalData);
    }

    filterByDate(date){
        this.setState({filterDate: date});
        let d;
        if(date === null){
            d = null;
        } else {
            d = new Date(date).getTime();
        }
        this.props.loadAllOperational(1, d);
    }

    validation(){
        const { orderDate, totalPrice, discount, selectedUser } = this.props.modalData;
        const { detailData } = this.props;
        if(!orderDate || detailData.length < 1 || !selectedUser){
            this.props.operationalValidationError('Silahkan isi semua kolom.');
            return false;
        }
        return true;
    }

    saveButton(){
        //console.log(this.props.location);
        if(this.validation()){
            this.props.saveOperational(this.props.modalData, this.props.detailData);
        }
        // const details = this.props.detailData;
        // const header = this.props.modalData;
        // this.props.savePurchase(details, header);
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
        console.log('check props', this.props);
        return(
            <Dashboard 
                modalWidth = '50%'
                modalContent={<OperationalPopup 
                    modalData={this.props.modalData} 
                    modalFunction={(modalForm) => this.setModalState(modalForm)}
                    users={this.props.userList}
                    inputedProduct={this.state.inputProduct}
                    inputProduct={(value) => this.setState({inputProduct:value})}
                    inputedPrice={this.state.inputPrice}
                    inputPrice={(value) => this.setState({inputPrice:value})}
                    inputedQty={this.state.inputQty}
                    inputQty={(value) => this.setState({inputQty:value})}
                    saveAction={() => this.saveButton()}
                    loading={this.props.saveLoading}
                    error={this.props.error}
                    detailList={this.props.detailData}
                    addDetail={() => this.addDetail()}
                    removeDetail={(index) => this.removeDetail(index)}
                    deleteFunction={() => this.deleteItem()}
                    promptDelete={this.state.promptDelete}
                    deleteMessage={(val) => this.setState({ promptDelete: val})}
                />} 
                viewContent={<OperationalContent 
                    data={this.props.operationalList}
                    paging={this.renderPagination(this.props.pages, this.props.currentPage)}
                    pageFunction={(index) => this.props.loadAllOperational(index, this.state.filterDate)}
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

const mapStateToProps = ({operationalData}) => {
    return operationalData;
}

export default connect(mapStateToProps, {
    loadAllUserOperational,
    setDetailOperational,
    loadAllOperational,
    loadOperationalById,
    setModalOperational,
    saveOperational,
    resetOperational,
    operationalValidationError,
    deleteOperational
})(OperationalScreen);