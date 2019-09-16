import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
loadReject,
loadRejectById,
deleteReject,
loadProduct,
saveRejection,
resetRejection,
rejectValidationError,
resetRejectionPopup,
setModalState } from '../actions';
import Dashboard from './Dashboard';
import { RejectionContent, RejectionPopup } from '../component/Rejection';
import WebFont from 'webfontloader';

WebFont.load({
   google: {
     families: ['Titillium Web:300,400,700', 'sans-serif']
   }
});
// modalData: {
//     transaksi: null,
//     product: null,
//     qty: 0,
//     status: null,
// },

const initial_state={
    popupOpen: false,
    promptDelete: false
}

class RejectScreen extends Component {

    state = initial_state;

    componentDidMount(){
        this.props.loadReject(1);
        this.props.loadProduct();
    }

    componentDidUpdate(){
        if(this.props.doneSave){
            //console.log('updated');
            this.setState({popupOpen: false})
            this.props.resetRejection();
            console.log(this.state);
            this.props.loadReject(1);
        }
    }

    viewItem(item) {
        this.props.loadRejectById(item);
        this.togglePopup(true);
    }

    setModalState(modalForm){
        this.props.setModalState(modalForm);
    }

    togglePopup(status){
        this.props.resetRejectionPopup();
        this.setState({popupOpen: status});
    }

    validation(){
        const { rejectDate, product, rejectType, status } = this.props.modalData;
        if(!rejectDate || !product || !status){
            this.props.rejectValidationError('Silahkan isi semua kolom.');
            return false;
        }
        return true;
    }

    deleteItem(){
        this.props.deleteReject(this.props.modalData);
    }

    saveButton(){
        //console.log(this.props.location);
        if(this.validation()){
            this.props.saveRejection(this.props.modalData, 0);
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
        console.log('props', this.props);
        return(
            <Dashboard 
                modalContent={<RejectionPopup 
                    modalData={this.props.modalData} 
                    modalFunction={(modalForm) => this.setModalState(modalForm)}
                    loadProduct={(id) => this.props.loadProduct(id)}
                    transaksi={this.props.transactionList}
                    products={this.props.productList}
                    saveAction={()=>this.saveButton()}
                    loading={this.props.loading}
                    path={this.props.location.pathname}
                    error={this.props.error}
                    deleteFunction={() => this.deleteItem()}
                    promptDelete={this.state.promptDelete}
                    deleteMessage={(val) => this.setState({ promptDelete: val})}
                />} 
                viewContent={<RejectionContent 
                    paging={this.renderPagination(this.props.pages, this.props.currentPage)}
                    pageFunction={(index) => this.props.loadReject(index)}
                    data={this.props.rejectionList}
                    popupState={this.props.popupState}
                    loading={this.props.loading}
                    viewItem={(item) => this.viewItem(item)}
                />}
                popupOpen={this.state.popupOpen}
                toggle={(status) => this.togglePopup(status)}
                history={this.props.history} 
            />
        )
    }
}

const mapStateToProps = ({rejectData}) => {
    return rejectData;
}

export default connect(mapStateToProps, {
    loadReject, 
    loadProduct, 
    saveRejection,
    resetRejection,
    rejectValidationError,
    setModalState,
    loadRejectById,
    resetRejectionPopup,
    deleteReject
})(RejectScreen);