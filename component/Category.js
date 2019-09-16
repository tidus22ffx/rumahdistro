import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { FaTrash, FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import {FormInput, FormDatePicker, ListView, ComboBox, ButtonTransparent} from './common';
import { pageController } from '../lib/Pagination';
import '../css/input.css';

export const CategoryContent = ({
    data,
    paging,
    pageFunction,
    viewItem,
    }) => {

    const header = ['Kode', 'Jenis Produk']; 
    const nullify = () => {
        return null;
    }

    // const pageController = () => {
    //     console.log('paging', paging);
    //     return (
    //         <div style={styles.pagingContainer}>
    //             <ButtonTransparent onClick={() => pageFunction(1)} style={{marginRight: 2}} className='buttonTransparent' height={20} width={20}>{<FaAngleDoubleLeft />}</ButtonTransparent>
    //             <ButtonTransparent onClick={() => pageFunction(paging.currentPage - 1)} style={{marginRight: 10}} className='buttonTransparent' height={20} width={20}>{<FaAngleLeft />}</ButtonTransparent>
    //             {paging.pages.map((item, index) => {
    //                 console.log('paging index', index);
    //                 if(index+1 === paging.currentPage){
    //                     return (
    //                         <ButtonTransparent 
    //                         onClick={() => pageFunction(index + 1)} 
    //                         style={{marginLeft: 2, marginRight: 2}} 
    //                         className='buttonTransparentSelected' 
    //                         height={20} 
    //                         width={20}>
    //                             {index+1}
    //                         </ButtonTransparent>
    //                     )
    //                 }
    //                 return (
    //                     <ButtonTransparent 
    //                     onClick={() => pageFunction(index + 1)} 
    //                     style={{marginLeft: 2, marginRight: 2}} 
    //                     className='buttonTransparent' 
    //                     height={20} 
    //                     width={20}>
    //                         {index+1}
    //                     </ButtonTransparent>
    //                 )}
    //             )}
    //             <ButtonTransparent onClick={() => pageFunction(paging.currentPage + 1)} style={{marginLeft: 10}} className='buttonTransparent' height={20} width={20}>{<FaAngleRight />}</ButtonTransparent>
    //             <ButtonTransparent onClick={() => pageFunction(paging.endPage)} style={{marginLeft: 2}} className='buttonTransparent' height={20} width={20}>{<FaAngleDoubleRight />}</ButtonTransparent>
    //         </div>
    //     )
        
    // }

    console.log(paging);
    return(
        <div style={styles.wrapper}>
            <div style={styles.headerStyle}>
                <div style={{borderBottom: '3px solid #c39243'}}>
                    Master Jenis Produk
                </div>
            </div>
            <div style={styles.listContainer}>
                <div style={{fontSize: 24, fontWeight: 400, color: '#c39243', fontFamily: 'Titillium Web'}}>Daftar Jenis Produk</div>
                <div style={{height: 10}}></div>
                <ListView columns={header} data={data} onClick={(item) => viewItem(item)}/>
            </div>
            {pageController(paging, pageFunction)}
        </div>
    );
}

export const CategoryPopup = ({
    modalData,
    modalFunction,
    saveAction,
    loading,
    error,
    promptDelete,
    deleteMessage,
    deleteFunction,
}) => {

    const setCategoryName = (item) => {
        const modalForm = { 
            ...modalData,
            categoryName: item
        }
        modalFunction(modalForm);
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

    console.log(modalData);

    return (
        <div style={styles.popupContent}>
            <div style={styles.headerArea}>
                <FormInput width='25%' value={modalData.idCategory} readonly={true} label='Kode Jenis Produk' placeholder='Kode Otomatis' />
                <div style={{width:'3%'}}></div>
                <FormInput width='45%' value={modalData.categoryName} onChangeText={(value) => setCategoryName(value.target.value)} label='Jenis Produk' placeholder='Masukkan nama jenis produk' />
            </div>
            {showError()}
            <div style={{ marginTop: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {renderButton()}
            </div>
            <div 
                style={{ width: '100%', height: 20, marginTop: 5, 
                display: modalData.idCategory ? 'flex' : 'none', justifyContent: 'flex-end' }}
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
        alignItems: 'flex-start',
        padding: 15,
    },
    headerArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        textAlign: 'center',
        width: '100%' 
    },
    pagingContainer: {
        fontSize: 12,
        display: 'flex',
        flexDirection: 'row',
        
    },
    textStyle:{
        color: '#333333',
        fontFamily: 'Titillium Web',
        fontSize: 14,
    }
}
