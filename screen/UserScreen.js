import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    loadUser,
    loadUserById,
    setModalUser,
    resetMasterUser,
    saveUser,
    userValidationError,
    deleteUser
} from '../actions';
import Dashboard from './Dashboard';
import { UserPopup, UserContent } from '../component/User';

// modalData: {
//     transaksi: null,
//     product: null,
//     qty: 0,
//     status: null,
// },

const initial_state={
    //selectedUser: null,
    popupOpen: false,
}

class ProductScreen extends Component {

    state = initial_state;

    componentDidMount(){
        console.log(this.props);
        this.props.loadUser(1);
    }

    viewItem(item){
        this.props.loadUserById(item);
        this.togglePopup(true);
    }

    reset(){
        this.props.resetMasterUser();
        this.props.loadUser(1);
    }

    componentDidUpdate(){
        if(this.props.doneSave){
            this.setState({popupOpen: false})
            this.reset();
        }
    }

    setModalState(modalForm){
        this.props.setModalUser(modalForm);
    }

    togglePopup(status){
        this.reset();
        this.setState({popupOpen: status});
    }

    validation(){
        const { name, email, phone, address } = this.props.modalData;
        if(!name || !email || !phone || !address){
            this.props.userValidationError('Silahkan isi semua kolom.');
            return false;
        }
        return true;
    }

    deleteItem(){
        this.props.deleteUser(this.props.modalData);
    }

    saveButton(){
        //console.log(this.props.location);
        //this.props.saveRejection(this.state.modalData, 0);
        // const details = this.props.detailData;
        if(this.validation()){
            const body = {
                ...this.props.modalData,
                roleId: 1,
            };
            console.log('save body', body);
            this.props.saveUser(body);
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
                modalWidth = '40%'
                modalContent={<UserPopup 
                    modalData={this.props.modalData} 
                    modalFunction={(modalForm) => this.setModalState(modalForm)}
                    saveAction={() => this.saveButton()}
                    loading={this.props.saveLoading}
                    error={this.props.error}
                    deleteFunction={() => this.deleteItem()}
                    promptDelete={this.state.promptDelete}
                    deleteMessage={(val) => this.setState({ promptDelete: val})}
                />} 
                viewContent={<UserContent 
                    data={this.props.userList}
                    paging={this.renderPagination(this.props.pages, this.props.currentPage)}
                    pageFunction={(index) => this.props.loadUser(index)}
                    currentPage={this.props.currentPage}
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

const mapStateToProps = ({userData}) => {
    return userData;
}

export default connect(mapStateToProps, {
    loadUser,
    loadUserById,
    setModalUser,
    resetMasterUser,
    saveUser,
    userValidationError,
    deleteUser
})(ProductScreen);