import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import {FormInput, FormDatePicker, ListView, ComboBox, ButtonTransparent} from './common';
import { FaTrash, FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import '../css/input.css';

export const PurchaseContent = ({
    data, 
    popupState,
    paging,
    pageFunction,
    currentPage,
    loading,
    viewItem
    }) => {

    const header = ['Kode', 'Tanggal', 'Harga', 'Diskon', 'Total']; 
    const nullify = () => {
        return null;
    }

    const pageController = () => {
        return (
            <div style={styles.pagingContainer}>
                <ButtonTransparent onClick={() => pageFunction(1)} style={{marginRight: 2}} className='buttonTransparent' height={20} width={20}>{<FaAngleDoubleLeft />}</ButtonTransparent>
                <ButtonTransparent onClick={() => pageFunction(paging.currentPage - 1)} style={{marginRight: 10}} className='buttonTransparent' height={20} width={20}>{<FaAngleLeft />}</ButtonTransparent>
                {paging.pages.map((item, index) => {
                    if(index+1 === paging.currentPage){
                        return (
                            <ButtonTransparent 
                            onClick={() => pageFunction(index + 1)} 
                            style={{marginLeft: 2, marginRight: 2}} 
                            className='buttonTransparentSelected' 
                            height={20} 
                            width={20}>
                                {index+1}
                            </ButtonTransparent>
                        )
                    }
                    return (
                        <ButtonTransparent 
                        onClick={() => pageFunction(index + 1)} 
                        style={{marginLeft: 2, marginRight: 2}} 
                        className='buttonTransparent' 
                        height={20} 
                        width={20}>
                            {index+1}
                        </ButtonTransparent>
                    )}
                )}
                <ButtonTransparent onClick={() => pageFunction(paging.currentPage + 1)} style={{marginLeft: 10}} className='buttonTransparent' height={20} width={20}>{<FaAngleRight />}</ButtonTransparent>
                <ButtonTransparent onClick={() => pageFunction(paging.endPage)} style={{marginLeft: 2}} className='buttonTransparent' height={20} width={20}>{<FaAngleDoubleRight />}</ButtonTransparent>
            </div>
        )
        
    }

    console.log(paging);
    return(
        <div style={styles.wrapper}>
            <div style={styles.headerStyle}>
                <div style={{borderBottom: '3px solid #c39243'}}>
                    Transaksi Belanja Produk
                </div>
            </div>
            <div style={styles.listContainer}>
                <div style={{fontSize: 24, fontWeight: 400, color: '#c39243', fontFamily: 'Titillium Web'}}>Daftar Belanja Produk</div>
                <div style={{height: 10}}></div>
                <ListView columns={header} data={data} onClick={(item) => viewItem(item)}/>
            </div>
            {pageController()}
        </div>
    );
}

export const PurchasePopup = ({
    modalFunction, 
    modalData, 
    detailList, 
    products,
    selectedProduct,
    selectProduct,
    inputedQty,
    inputQty,
    addDetail,
    error,
    removeDetail,
    saveAction,
    loading,
    promptDelete,
    deleteMessage,
    deleteFunction,
    }) => {

    const setOrderDate = (item) => {
        const modalForm = { 
            ...modalData,
            orderDate: item
        }
        modalFunction(modalForm);
    }

    const setTotalPrice = (item) => {
        const modalForm = { 
            ...modalData,
            totalPrice: item
        }
        modalFunction(modalForm);
    }

    const setDiscount = (item) => {
        const modalForm = { 
            ...modalData,
            discount: item
        }
        modalFunction(modalForm);
    }

    const renderDetailList = () => {
        console.log(detailList);
        return detailList.map((item, index) => {
            console.log('xx');
            return (
                <div key={index} style={styles.detailBoxHeader}>
                    <div style={{flex: 1, paddingLeft: 5, }}>{index+1}</div>
                    <div style={{flex: 4, paddingLeft: 5, borderLeft: '0.5px solid' }}>{item.productName}</div>
                    <div style={{flex: 3, paddingLeft: 5, borderLeft: '0.5px solid' }}>{item.price}</div>
                    <div style={{flex: 1.5, paddingLeft: 5, borderLeft: '0.5px solid' }}>{item.qty}</div>
                    <div style={{flex: 3, paddingLeft: 5, borderLeft: '0.5px solid' }}>{item.subtotal}</div>
                    <div style={{flex: 1, }}>
                        <button onClick={() => removeDetail(index)}>
                            <FaTrash color='#c0392b'/>
                        </button>    
                    </div>
                </div>
            );
        }); 
    }

    const renderButton = () => {
        console.log(loading);
        if(loading){
            return(
                <ButtonTransparent className='buttonTransparent'>
                    <Loader type="Puff" color="#c39243" height={25} width={25}/> 
                </ButtonTransparent>
            )
        }
        return(
            <ButtonTransparent onClick={saveAction} className='buttonTransparent'>
                Submit 
            </ButtonTransparent>
        )
    }

    const showError = () => {
        if(error!== null){
            return <div style={styles.error}>{error}</div>;
        }
    }

    console.log(inputedQty);
    return (
        <div style={styles.popupContent}>
            <div style={styles.headerArea}>
                <FormInput width='30%' value={modalData.idPurchaseH} readonly={true} label='Kode Purchase' placeholder='Masukkan Kode' />
                <div style={{width:'5%'}}></div>
                <FormDatePicker width='25%' selected={modalData.orderDate} onChange={(date) => setOrderDate(date)} label='Tanggal Purchase' />
            </div>
            <div style={styles.detailArea}>
                <ComboBox width='30%' selectedOption={selectedProduct} onChange={(item) => selectProduct(item)} label='Produk' placeholder='Pilih Produk' options={products} />
                <div style={{width:'5%'}}></div>
                <FormInput width='25%' type='number' value={inputedQty} onChangeText={(value) => inputQty(value.target.value)} label='Qty' placeholder='Masukkan jumlah unit' />
                <div style={{width:'5%'}}></div>
                <ButtonTransparent onClick={() => addDetail()} height={25} width='10%' className={'buttonTransparent'}>Add</ButtonTransparent>
            </div>
            <div style={styles.detailBox}>
                <div style={styles.detailBoxHeader}>
                    <div style={{flex: 1, paddingLeft: 5, }}>No. </div>
                    <div style={{flex: 4, paddingLeft: 5, borderLeft: '0.5px solid' }}>Nama Produk</div>
                    <div style={{flex: 3, paddingLeft: 5, borderLeft: '0.5px solid' }}>Harga</div>
                    <div style={{flex: 1.5, paddingLeft: 5, borderLeft: '0.5px solid' }}>Jumlah</div>
                    <div style={{flex: 3, paddingLeft: 5, borderLeft: '0.5px solid' }}>Subtotal</div>
                    <div style={{flex: 1, }}>{' '}</div>
                </div>
                {renderDetailList()}
            </div>
            <div style={styles.rightBottomFields}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <FormInput width='25%' type='number' value={modalData.discount} onChangeText={(value) => setDiscount(value.target.value)} label='Diskon' placeholder='Masukkan Diskon' />
                    <FormInput width='25%' value={modalData.totalPrice} readonly label='Total' placeholder='0' />
                </div>
                <FormInput width='25%' value={modalData.totalPrice - modalData.discount} readonly label='Harga Bersih' placeholder='0' />
            </div>
            {showError()}
            <div style={{ marginTop: 10, width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                {renderButton()}
            </div>
            <div 
                style={{ width: '100%', height: 20, marginTop: 5, 
                display: modalData.idPurchaseH ? 'flex' : 'none', justifyContent: 'flex-end' }}
            >
                <div 
                    style={{ width: '50%', display: 'flex', flexDirection: 'row', 
                             justifyContent: 'flex-end', alignItems: 'center' }}
                >
                    <div 
                        style={{ width: promptDelete ? '90%' : 0, display: promptDelete ? 'flex' : 'none', 
                        flexDirection: 'row', justifyContent: 'center', 
                        fontSize: 9, backgroundColor: '#c39243', padding: 3, borderRadius: '2px' }}
                    >
                        <div>Apa anda yakin ingin menghapus data ini?</div>
                        <div 
                            onClick={() => {
                                deleteMessage(!promptDelete);
                                deleteFunction();
                            }}
                            style={{ marginLeft: 5, cursor: 'pointer' }}
                        >Ya</div>
                        <div 
                            style={{ marginLeft: 5, cursor: 'pointer' }}
                            onClick={() => deleteMessage(!promptDelete)}
                        >Tidak</div>
                    </div>
                    <FaTrash style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => deleteMessage(!promptDelete)} />    
                </div>
            </div>  
        </div>
    );
}

const styles = {
    wrapper: {
        padding: 25,
    },
    headerStyle: {
        fontSize: 32,
        fontWeight: 600,
        color: '#c39243',
        fontFamily: 'Titillium Web',
    },
    listContainer: {
        width: '100%',
        paddingTop: 25,
        borderBottom: '1px solid #e3e3e3', 
        overflow: 'hidden'
    },
    listItem: {
        height: 35,
        width: '100%',
        borderTop: '1px solid #e3e3e3',
        paddingLeft: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemName: {
        flex: 6,
        color: '#333333',
        fontWeight: 500,
    },
    listItemStatus: {
        flex: 1,
    },
    popupContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    headerArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //border: '1px white solid',
        width: '100%',
    },
    detailArea: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '100%',
    },
    detailBox: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        width: '100%',
        minHeight: 150,
        border: '2px solid #999999',
        backgroundColor: '#fff',
        marginTop: 15,
    },
    detailBoxHeader: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        color: '#333333',
        
    },
    rightBottomFields: {

        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-end',
    },
    error: {
        fontSize: 14,
        color: '#c0392b',
        fontFamily: 'Titillium Web',
        marginTop: 10, 
    },
    pagingContainer: {
        fontSize: 12,
        display: 'flex',
        flexDirection: 'row',
        
    }
}
