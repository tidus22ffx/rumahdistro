import React, { Component } from 'react';
import { getYearlyReport, 
         setReportDate,
         setReportMonth,
         setReportYear,
          } from '../actions';
import { connect } from 'react-redux';
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

class YearlyReport extends Component {


    componentDidMount(){
        this.props.getYearlyReport(new Date().getFullYear());       
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
        const { reportData } = this.props;
        const { tableRow, tableContainer, tableHeader, tableContent, footerContent } = styles;
        let income = 0;
        let qty = 0;
        const months=[
            '','Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const renderTableContent = () => reportData.map(item => {
            qty += item.qty;
            income += item.income;
            return (
                <div style={tableRow}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 1 }}>{months[item.nomor]}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>{item.qty} pcs</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>{item.income}</div>
                </div>
            );
        })

        return (
            <div style={tableContainer}>
                <div style={tableHeader}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 1 }}>Bulan</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>Item Terjual</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>Laba</div>
                </div>
                <div style={tableContent}>
                    {renderTableContent()}
                </div>
                <div style={footerContent}>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 1 }}>Total</div>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.4 }}>{qty}</div>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 0.4 }}>{income}</div>
                </div>
            </div>
        )
    }

    render(){
        console.log('props', this.props);
        return(
            <Dashboard 
                viewContent={
                    <Report 
                        headerText='Laporan Per Tahun'
                        control={['year']}
                        search={() => this.props.getYearlyReport(this.props.year.value)}
                        loading={this.props.loading}
                        date={this.props.date}
                        setDate={(value) => this.props.setReportDate(value)}
                        setMonth={(value) => this.props.setReportMonth(value)}
                        setYear={(value) => this.props.setReportYear(value)}
                        month={this.props.month}
                        year={this.props.year}
                        chartType={'line'}
                        dataset={this.props.dataset}
                        labels={[
                            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                            'Agustus', 'September', 'Oktober', 'November', 'Desember'
                        ]}
                        error={this.props.error} 
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
    getYearlyReport,
    setReportDate,
    setReportMonth,
    setReportYear,
})(YearlyReport);