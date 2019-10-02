import React, { Component } from 'react';
import { getMonthlyStockReport, 
         setReportMonth,
         setReportYear,
         loadProductReport,
         selectProductReport
          } from '../actions';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Report from '../component/Report';
import WebFont from 'webfontloader';
import {formatDate} from '../lib/utilities';

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
}

class MonthlyStockReport extends Component {

    componentDidMount(){
        this.props.loadProductReport();
    }

    // renderPagination(totalRows, currentPage=1){
    //     const maxRow=5;
    //     const maxPage=5;
    //     const totalPages = Math.ceil(totalRows / maxRow);


    //     if(currentPage < 1  ){
    //         currentPage = 1;
    //     } else if (currentPage > totalPages) {
    //         currentPage = totalPages;
    //     }

    //     let startPage = 1;
    //     let endPage = 1;

    //     if(totalPages <= maxPage){
    //         startPage = 1;
    //         endPage = totalPages;
    //     } else {
    //         const maxPagesBeforeCurrentPage =  Math.floor(maxPage / 2);
    //         const maxPagesAfterCurrentPage =  Math.ceil(maxPage / 2) - 1;
    //         console.log(maxPagesBeforeCurrentPage, maxPagesAfterCurrentPage );
    //         if(currentPage <= maxPagesBeforeCurrentPage){
    //             startPage = 1;
    //             endPage = maxPage;
    //         } else if (currentPage + maxPagesAfterCurrentPage >= totalPages){
    //             startPage = totalPages - maxPage + 1;
    //             endPage = totalPages;
    //         } else {
    //             startPage = currentPage - maxPagesBeforeCurrentPage;
    //             endPage = currentPage + maxPagesAfterCurrentPage;
    //         }
    //     }

    //     const startIndex = (currentPage - 1);

    //     let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    //     return {
    //         currentPage: currentPage,
    //         totalPages: totalPages,
    //         startPage: startPage,
    //         endPage: endPage,
    //         pages: pages,
    //     }
    // }

    renderReportTable(){
        const { reportData, month, year } = this.props;
        const { tableRow, tableContainer, tableHeader, tableContent, footerContent } = styles;
        let plus = 0;
        let minus = 0;
        const months=[
            '','Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
            'Agu', 'Sep', 'Okt', 'Nov', 'Des'
        ];
        const last = reportData[reportData.length - 1];
        const renderTableContent = () => reportData.map(item => {
            
            if(item.stockUpdate === 'PLUS'){
                plus += item.perubahan;
            } else {
                minus += item.perubahan;
            }
            
            return (
                <div style={tableRow}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatDate(item.tanggal)}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{item.transaction} pcs</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>
                        {item.stockUpdate === "PLUS" ? item.perubahan : 0}
                    </div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>
                        {item.stockUpdate === "MINUS" ? item.perubahan : 0}
                    </div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>{item.qty} pcs</div>
                </div>
            );
        })

        return (
            <div style={tableContainer}>
                <div style={tableHeader}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Tanggal</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Deskripsi</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>In</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>Out</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>Sisa Stock</div>
                </div>
                <div style={tableContent}>
                    {renderTableContent()}
                </div>
                <div style={footerContent}>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 1.6 }}>Summary</div>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.4 }}>{plus} pcs</div>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.4 }}>{minus} pcs</div>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.4 }}>{last ? last.qty : 0} pcs</div>
                </div>
            </div>
        )
    }

    render(){
        const { 
            year, 
            month, 
            dataset, 
            loading, 
            date, 
            labels, 
            productList, 
            selectProductReport,
            selectedProduct 
        } = this.props;
        const productPicker = {
            label: 'Produk',
            options: productList,
            onChange: selectProductReport,
            selectedItem: selectedProduct
        }
        return(
            <Dashboard 
                viewContent={
                    <Report 
                        headerText='Laporan Stock Per Bulan'
                        control={['year', 'month', productPicker]}
                        search={() => this.props.getMonthlyStockReport(
                                            year.value, 
                                            month.value, 
                                            selectedProduct.value.idProduct
                                )}
                        loading={loading}
                        date={date}
                        setDate={(value) => this.props.setReportDate(value)}
                        setMonth={(value) => this.props.setReportMonth(value)}
                        setYear={(value) => this.props.setReportYear(value)}
                        month={month}
                        year={year}
                        chartType={'none'}
                        dataset={dataset}
                        labels={labels} 
                    >
                        {this.renderReportTable()}
                    </Report>
                }
                fab={false}
                history={this.props.history}
            />
        )
    }
}

const styles={
    tableContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItem: 'center',
        height: 'auto',
        marginTop: 25,
    },
    tableHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItem: 'center',
        minHeight: 25,
        borderBottom: '0.1px solid '
    },
    tableRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItem: 'center',
        minHeight: 25,
    },
    footerContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItem: 'center',
        minHeight: 25,
        marginTop: 30,
        borderTop: '1.5px solid '
    }
}

const mapStateToProps = ({ reportData }) => {
    return reportData;
}

export default connect(mapStateToProps, {
    setReportMonth,
    setReportYear,
    getMonthlyStockReport,
    loadProductReport,
    selectProductReport
})(MonthlyStockReport);