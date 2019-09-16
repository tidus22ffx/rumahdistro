import React, { Component } from 'react';
import { getRejectReport, 
         setReportMonth,
         setReportYear,
          } from '../actions';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Report from '../component/Report';
import { formatDate } from '../lib/FormatDate';
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

class RejectReport extends Component {

    componentDidMount(){
        this.props.getRejectReport();       
    }

    renderReportTable(){
        const { reportData, month, year } = this.props;
        const { tableRow, tableContainer, tableHeader, tableContent, footerContent } = styles;
        let qty = 0;
        let status = null;
        
        const renderTableContent = () => reportData.map(item => {
            qty += item.qty;
            if(item.status === 1){
                status = 'Diproses';
            } else if (item.status === 2) {
                status = 'Dihibahkan';
            } else if (item.status === 3) {
                status = 'Diretur';
            } else {
                status = '';
            }
            return (
                <div style={tableRow}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{formatDate(item.tanggal)}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 1 }}>{item.productName}</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>{item.qty} pcs</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>{status}</div>
                </div>
            );
        })

        return (
            <div style={tableContainer}>
                <div style={tableHeader}>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Tanggal</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 1 }}>Produk</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.4 }}>Kuantitas</div>
                    <div style={{ color: '#333333', fontSize: 14, flex: 0.8 }}>Status</div>
                </div>
                <div style={tableContent}>
                    {renderTableContent()}
                </div>
                <div style={footerContent}>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 1.8 }}>Total</div>
                    <div style={{ fontWeight: 'bold', color: '#333333', fontSize: 14, flex: 1.2 }}>{qty} pcs</div>
                </div>
            </div>
        )
    }

    render(){
        const { year, month, dataset, loading, date, labels } = this.props;
        
        return(
            <Dashboard 
                viewContent={
                    <Report 
                        headerText={`Laporan Barang Reject Bulan ${month.label} ${year.value}`}
                        control={['year', 'month']}
                        search={() => this.props.getRejectReport(year.value, month.value)}
                        loading={loading}
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
        width: '75%',
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
    getRejectReport
})(RejectReport);