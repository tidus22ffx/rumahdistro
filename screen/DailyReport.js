import React, { Component } from 'react';
import { getDailyReport, 
         setReportDate,
         setReportMonth,
         setReportYear,
         loadUserReport,
         selectUserReport
          } from '../actions';
import { connect } from 'react-redux';
import {formatNumber, formatCurrency} from '../lib/utilities';
import Dashboard from './Dashboard';
import Report from '../component/Report';
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
}

class DailyReport extends Component {


    componentDidMount(){
        this.props.loadUserReport();
        this.props.getDailyReport();       
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
        const { tableRow, tableContainer, tableHeader, tableContent, footerContent, footerOuterContent } = styles;
        let modal = 0;
        let omset = 0;
        let qty = 0;
        let laba = 0;
        let cumulativeDiscount = 0;
        
        const renderTableContent = () => reportData.map(item => {
            const hargaBersih = (item.qty * item.hargaJual) - (item.qty * item.diskonKhusus);
            qty += item.qty;
            // omset += item.omset;
            cumulativeDiscount += (item.diskonKhusus * item.qty);
            omset += hargaBersih;
            modal += (item.hargaBeli * item.qty);

            return (
                <div style={tableRow}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{item.user_name}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{item.product_name}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(item.hargaBeli)}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(item.hargaJual)}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatNumber(item.qty)} pcs</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(item.hargaJual * item.qty)}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(item.diskonKhusus)}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(hargaBersih)}</div>
                </div>
            );
        })

        return (
            <div style={tableContainer}>
                <div style={tableHeader}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Pembeli</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Produk</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Harga Beli</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Harga Jual</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Kuantitas</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Subtotal</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Diskon Khusus</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Harga Bersih</div>
                </div>
                <div style={tableContent}>
                    {renderTableContent()}
                </div>
                <div style={footerOuterContent} >
                    <div style={footerContent}>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 5.6 }}>Total Diskon Khusus</div>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(cumulativeDiscount)}</div>
                    </div>
                </div>
                <div style={{...footerOuterContent, marginTop: 0}} >
                    <div style={footerContent}>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 5.6 }}>Omset</div>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(omset)}</div>
                    </div>
                    <div style={footerContent}>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 5.6 }}>Modal</div>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(modal)}</div>
                        {/* <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(omset)}</div> */}
                        {/* <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.4 }}>{formatNumber(qty)}</div> */}
                        {/* <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(omset)}</div> */}
                        {/* <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(laba)}</div> */}
                    </div>
                </div>
                <div style={footerOuterContent}>
                    <div style={footerContent}>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 5.6 }}>Laba</div>
                        <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.8 }}>{formatCurrency(omset - modal)}</div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        console.log('props', this.props);
        const { year, month, dataset, loading, date, labels } = this.props;

        const months=[
            '','Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Juli',
            'Agu', 'Sep', 'Okt', 'Nov', 'Des'
        ];
        const resellerPicker = {
            label: 'Reseller',
            selectedItem: this.props.selectedUser,
            options: this.props.userList,
            onChange: this.props.selectUserReport
        }
        return(
            <Dashboard 
                viewContent={
                    <Report 
                        headerText={`Laporan Harian Tanggal ${date.value} ${months[month.value]} ${year.value}`}
                        control={['year', 'month', 'date', resellerPicker]}
                        search={() => this.props.getDailyReport(year.value, month.value, date.value, this.props.selectedUser)}
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
        width: '100%',
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
    }, footerOuterContent: {
        width: '100%',
        marginTop: 30,
        borderTop: '1.5px solid '
    }
}

const mapStateToProps = ({ reportData }) => {
    return reportData;
}

export default connect(mapStateToProps, {
    getDailyReport,
    setReportDate,
    setReportMonth,
    setReportYear,
    loadUserReport,
    selectUserReport
})(DailyReport);