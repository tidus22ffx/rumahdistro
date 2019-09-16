import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import {FormInput, FormDatePicker, ListView, ComboBox, ButtonTransparent} from './common';
import { FaTrash, FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import '../css/input.css';

//Konten utama, menampilkan listview props yang dibutuhkan adalah data
export const RejectionContent = ({
    data, 
    paging,
    pageFunction,
    viewItem,
    }) => {
    //array header untuk kolom dari listview
    const header = ['id', 'Tanggal Input', 'Product', 'Qty', 'status'] 
    const nullify = () => {
        return null;
    }

    const pageController = () => {
        console.log('paging', paging);
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

    return(
        <div style={styles.wrapper}>
            <div style={styles.headerStyle}>
                <div style={{borderBottom: '3px solid #c39243'}}>
                    Barang Reject
                </div>
            </div>
            <div style={styles.listContainer}>
                <div style={{fontSize: 24, fontWeight: 400, color: '#c39243', fontFamily: 'Titillium Web'}}>Daftar Barang Reject</div>
                <div style={{height: 10}}></div>
                <ListView columns={header} data={data} onClick={(item) => viewItem(item)}/>
            </div>
            {pageController()}
        </div>
    );
}

//component popup props terdiri dari:
//  state loading untuk button
//  action reducer untuk save new data
//  modal function untuk menyimpan state objek yang terpilih
//  modalData, data state modal
//  loadProduct, untuk mendapatkan list product berdasarkan id transaksi yg dipilih
//  transaksi, list transaksi,
//  products, list produk
export const RejectionPopup = ({
loading, 
saveAction, 
modalFunction, 
modalData, 
loadProduct,
error, 
transaksi,
promptDelete,
deleteMessage,
deleteFunction, 
products}) =>{
    const setTransaksi = (item) => {
        const modalForm = { 
            ...modalData,
            transaksi: item
        }
        modalFunction(modalForm);
        loadProduct(item.value);
    }

    const setProduct = (item) => {
        const modalForm = { 
            ...modalData,
            product: item
        }
        modalFunction(modalForm);
    }

    const setQty = (item) => {
        let quantity = item;
        if(quantity > modalData.product.value.productStock){
            quantity = modalData.product.value.productStock
        }
        const modalForm = { 
            ...modalData,
            qty: quantity
        }
        modalFunction(modalForm);
    }

    const setStatus = (item) => {
        console.log('item', item);
        const modalForm = { 
            ...modalData,
            status: item
        }
        modalFunction(modalForm);
    }

    const setRejectDate = (item) => {
        const modalForm = { 
            ...modalData,
            rejectDate: item
        }
        modalFunction(modalForm);
    }

    const renderButton = () => {
        if(loading){
            return(
                <ButtonTransparent className='buttonTransparent' onClick={()=>saveAction()}>
                    <Loader type="Puff" color="#c39243" height={25} width={25}/> 
                </ButtonTransparent>
            )
        }
        return(
            <ButtonTransparent className='buttonTransparent' onClick={()=>saveAction()}>
                Submit 
            </ButtonTransparent>
        )
    }

    const showError = () => {
        if(error!== null){
            return <div style={styles.error}>{error}</div>;
        }
    }

    const rejectTypeOption = [
        {
            value: 1,
            label: 'Diproses',
        },
        {
            value: 2,
            label: 'Dihibahkan',
        },
        {
            value: 3,
            label: 'Diretur',
        }
    ]
    return (
        <div style={styles.popupContent}>
            <FormInput width='80%' value={modalData.rejectId} readonly label='Kode Reject' placeholder='Kode Otomatis' />
            <FormDatePicker width='80%' selected={modalData.rejectDate} onChange={(date) => setRejectDate(date)} label='Tanggal Input' />
            <ComboBox width='80%' selectedOption={modalData.product} onChange={(item) => setProduct(item)} label='Product' placeholder='Pilih Product' options={products}/>
            <FormInput width='80%' readonly={modalData.product === null ? true : false} value={modalData.qty} onChangeText={(value) => setQty(value.target.value)} label='Qty' placeholder='Masukkan jumlah unit' />
            <ComboBox width='80%' selectedOption={modalData.status} onChange={(item) => setStatus(item)} label='Jenis Reject' placeholder='Pilih Salah satu' options={rejectTypeOption}/>
            {showError()}
            <div style={{ marginTop: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {renderButton()}
            </div>
            <div 
                style={{ width: '100%', height: 20, marginTop: 5, 
                display: modalData.rejectId ? 'flex' : 'none', justifyContent: 'flex-end' }}
            >
                <div 
                    style={{ width: '55%', display: 'flex', flexDirection: 'row', 
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
        padding: 20,
    },
    pagingContainer: {
        fontSize: 12,
        display: 'flex',
        flexDirection: 'row',
        
    },
    error: {
        fontSize: 14,
        color: '#c0392b',
        fontFamily: 'Titillium Web',
        marginTop: 10, 
    },
    textStyle:{
        color: '#333333',
        fontFamily: 'Titillium Web',
        fontSize: 14,
    }
}
