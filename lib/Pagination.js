import React, { Component } from 'react';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { ButtonTransparent } from '../component/common';

export const renderPagination = (totalRows, currentPage=1) => {
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

export const pageController = (paging, pageFunction) => {
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

const styles = {
    pagingContainer: {
        fontSize: 12,
        display: 'flex',
        flexDirection: 'row',
    },
}