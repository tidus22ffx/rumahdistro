import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    loadCategory,
    loadCategoryById,
    setModalCategory,
    resetModalCategory,
    resetMasterCategory,
    throwError,
    saveCategory,
    deleteCategory
} from '../actions';
import Dashboard from './Dashboard';
import { CategoryPopup, CategoryContent } from '../component/Category';
import { renderPagination } from '../lib/Pagination';

// modalData: {
//     transaksi: null,
//     product: null,
//     qty: 0,
//     status: null,
// },

const initial_state={
    //selectedUser: null,
    popupOpen: false,
    promptDelete: false
}

class ProductScreen extends Component {

    state = initial_state;

    componentDidMount(){
        console.log(this.props);
        this.props.loadCategory(1);
    }

    viewItem(item){
        this.props.loadCategoryById(item);
        this.togglePopup(true);
    }

    componentDidUpdate(){
        if(this.props.doneSave){
            this.setState({popupOpen: false})
            this.props.resetMasterCategory();
            this.props.loadCategory(1);
        }
    }

    setModalState(modalForm){
        this.props.setModalCategory(modalForm);
    }

    togglePopup(status){
        this.props.resetModalCategory();
        this.setState({popupOpen: status});
    }

    deleteItem(){
        this.props.deleteCategory(this.props.modalData);
    }

    validation(){
        const { categoryName } = this.props.modalData;
        if(!categoryName){
            this.props.throwError('Silahkan isi semua kolom.');
            return false;
        }
        return true;
    }

    saveButton(){
        //console.log(this.props.location);
        //this.props.saveRejection(this.state.modalData, 0);
        // const details = this.props.detailData;
        if(this.validation()){
            const body = this.props.modalData;
            this.props.saveCategory(body);
        }
    }

    render(){
        console.log(this.props);
        return(
            <Dashboard 
                modalWidth = '40%'
                modalContent={<CategoryPopup 
                    modalData={this.props.modalData} 
                    modalFunction={(modalForm) => this.setModalState(modalForm)}
                    saveAction={() => this.saveButton()}
                    loading={this.props.saveLoading}
                    error={this.props.error}
                    deleteFunction={() => this.deleteItem()}
                    promptDelete={this.state.promptDelete}
                    deleteMessage={(val) => this.setState({ promptDelete: val})}
                />} 
                viewContent={<CategoryContent 
                    data={this.props.categoryList}
                    paging={renderPagination(this.props.pages, this.props.currentPage)}
                    pageFunction={(index) => this.props.loadCategory(index)}
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

const mapStateToProps = ({categoryData}) => {
    return categoryData;
}

export default connect(mapStateToProps, {
    loadCategory,
    loadCategoryById,
    setModalCategory,
    resetModalCategory,
    resetMasterCategory,
    throwError,
    saveCategory,
    deleteCategory
})(ProductScreen);