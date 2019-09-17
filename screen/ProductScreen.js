import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    loadAllJenisProduct,
    loadAllProductMaster,
    loadProductById,
    setModalProduct,
    setProductJenisProduct,
    resetMasterProduct,
    saveProduct,
    deleteProduct,
    productValidationError,
} from '../actions';
import Dashboard from './Dashboard';
import { ProductPopup, ProductContent } from '../component/Product';
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
        this.props.loadAllJenisProduct();
        this.props.loadAllProductMaster(1);
    }

    viewItem(item){
        this.props.loadProductById(item);
        this.togglePopup(true);
    }

    componentDidUpdate(){
        if(this.props.doneSave){
            this.setState({popupOpen: false})
            this.props.resetMasterProduct();
            this.props.loadAllProductMaster(1);
            this.props.loadAllJenisProduct();
        }
    }

    reset() {
        this.props.resetMasterProduct();
        this.props.loadAllJenisProduct();
        this.props.loadAllProductMaster(1);
    }

    setModalState(modalForm){
        this.props.setModalProduct(modalForm);
    }

    togglePopup(status){
        this.reset();
        this.setState({popupOpen: status});
    }

    
    validation(){
        const { selectedJenisProduct } = this.props;
        console.log(selectedJenisProduct);
        const { productName } = this.props.modalData;
        if(!selectedJenisProduct || !productName){
            this.props.productValidationError('Silahkan isi semua kolom.');
            return false;
        } else if (!selectedJenisProduct.value){
            this.props.productValidationError('Silahkan isi semua kolom.');
            return false;
        }
        return true;
    }


    saveButton(){
        if(this.validation()){
            const jenisProduct = this.props.selectedJenisProduct;
            const body = this.props.modalData;
            this.props.saveProduct(body, jenisProduct.value);
        }
    }

    deleteItem(){
        this.props.deleteProduct(this.props.modalData);
    }

    render(){
        return(
            <Dashboard 
                modalWidth = '40%'
                modalContent={<ProductPopup 
                    modalData={this.props.modalData} 
                    modalFunction={(modalForm) => this.setModalState(modalForm)}
                    saveAction={() => this.saveButton()}
                    loading={this.props.saveLoading}
                    error={this.props.error}
                    jenisList={this.props.jenisProductList}
                    setJenis={(jenis) => this.props.setProductJenisProduct(jenis)}
                    selectedJenis={this.props.selectedJenisProduct}
                    deleteFunction={() => this.deleteItem()}
                    promptDelete={this.state.promptDelete}
                    deleteMessage={(val) => this.setState({ promptDelete: val})}
                />} 
                viewContent={<ProductContent 
                    data={this.props.productList}
                    paging={renderPagination(this.props.pages, this.props.currentPage)}
                    pageFunction={(index) => this.props.loadAllProductMaster(index)}
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

const mapStateToProps = ({productData}) => {
    return productData;
}

export default connect(mapStateToProps, {
    loadAllJenisProduct,
    loadAllProductMaster,
    loadProductById,
    setModalProduct,
    setProductJenisProduct,
    resetMasterProduct,
    saveProduct,
    deleteProduct,
    productValidationError,
})(ProductScreen);