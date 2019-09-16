import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PopupMenu } from '../component/common';
import { FaPlus, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { logoIndisuf, logoIndisufText } from '../assets/image';
import { RejectionContent, RejectionPopup} from '../component/Rejection';
import '../css/Dashboard.css';

class Dashboard extends Component {
    //inisialisasi state popup
    constructor(props){
        super(props);
        this.state = {
            popupOpen: props.popupOpen,
            masterOpen: true,
            transaksiOpen: true,
            laporanOpen: true,
        }
    }

    //fungsi render popup
    renderPopup(){
        if(this.props.popupOpen){
            //konten dari modal adalah prop dari homescreen.js 
            const {modalContent, modalWidth = 500} = this.props;
            return (
                <PopupMenu width={modalWidth} onClose={() => this.onFabPress(false)}>
                    {modalContent}
                </PopupMenu>
            );
        }
        return null;
    }

    //fungsi button fab toggle popup 
    onFabPress(status){
        this.props.toggle(status);
    }

    adminMenu(){
        const idRole = this.props.role;
        return {

        }
    }

    render() {
        //props Rejection content dari homescreen.js berupa listview
        console.log(this.state);
        const { viewContent, history, fab = true } = this.props;
        return(
            <div style={styles.globalWrapper}>
                {this.renderPopup()}
                <div style={styles.headContainer}>
                    <div style={styles.logo} className='logoIndisuf' onClick={() => history.push('/Home')}>
                        <div style={styles.logoContainer}>
                            <img src={logoIndisuf} style={styles.logoStyle}/>
                        </div>
                        <div style={styles.logoContainer}>
                            <img src={logoIndisufText} style={styles.logoTextStyle}/>
                        </div>
                    </div>
                </div>
                <div style={styles.contentWrapper}>
                    <div style={styles.sidebarStyle}>
                        <div style={styles.separatorContainer} onClick={() => this.setState({ masterOpen: !this.state.masterOpen })}>
                            <div style={styles.menuSeparator}>Master</div>
                            {!this.state.masterOpen &&
                                <FaCaretDown size={16} color={'#f1f1f1'} />
                            }
                            {this.state.masterOpen &&
                                <FaCaretUp size={16} color={'#f1f1f1'} />
                            }
                        </div>
                        <div className='childMenuStyle' style={this.state.masterOpen ? null : styles.hide } onClick={() => history.push('/Home')}>
                            Home
                        </div>
                        <div className='childMenuStyle' style={this.state.masterOpen ? null : styles.hide } onClick={() => history.push('/Category')}>
                            Kategori Produk
                        </div>
                        <div className='childMenuStyle' style={this.state.masterOpen ? null : styles.hide } onClick={() => history.push('/Product')}>
                            Produk
                        </div>
                        <div className='childMenuStyle' style={this.state.masterOpen ? null : styles.hide } onClick={() => history.push('/User')}>
                            Admin / Reseller
                        </div>
                        <div style={styles.separatorContainer} onClick={() => this.setState({ transaksiOpen: !this.state.transaksiOpen })}>
                            <div style={styles.menuSeparator}>Transaksi</div>
                            {!this.state.transaksiOpen &&
                                <FaCaretDown size={16} color={'#f1f1f1'} />
                            }
                            {this.state.transaksiOpen &&
                                <FaCaretUp size={16} color={'#f1f1f1'} />
                            }
                        </div>
                        <div className='childMenuStyle' style={this.state.transaksiOpen ? null : styles.hide } onClick={() => history.push('/Purchase')}>
                            Belanja Product
                        </div>
                        <div className='childMenuStyle' style={this.state.transaksiOpen ? null : styles.hide } onClick={() => history.push('/Operational')}>
                            Belanja Operasional
                        </div>
                        <div className='childMenuStyle' style={this.state.transaksiOpen ? null : styles.hide } onClick={() => history.push('/Reject')}>
                            Barang Reject
                        </div>
                        <div className='childMenuStyle' style={this.state.transaksiOpen ? null : styles.hide } onClick={() => history.push('/Order')}>
                            Penjualan
                        </div>
                        <div style={styles.separatorContainer} onClick={() => this.setState({ laporanOpen: !this.state.laporanOpen})}>
                            <div style={styles.menuSeparator}>Laporan</div>
                            {!this.state.laporanOpen &&
                                <FaCaretDown size={16} color={'#f1f1f1'} />
                            }
                            {this.state.laporanOpen &&
                                <FaCaretUp size={16} color={'#f1f1f1'} />
                            }
                        </div>
                        <div className='childMenuStyle' style={this.state.laporanOpen ? null : styles.hide } onClick={() => history.push('/DailyReport')}>
                            Penjualan Harian
                        </div>
                        <div className='childMenuStyle' style={this.state.laporanOpen ? null : styles.hide } onClick={() => history.push('/MonthlyReport')}>
                            Penjualan Bulanan
                        </div>
                        <div className='childMenuStyle' style={this.state.laporanOpen ? null : styles.hide } onClick={() => history.push('/YearlyReport')}>
                            Penjualan Tahunan
                        </div>
                        <div className='childMenuStyle' style={this.state.laporanOpen ? null : styles.hide } onClick={() => history.push('/OperationalReport')}>
                            Operasional Bulanan
                        </div>
                        <div className='childMenuStyle' style={this.state.laporanOpen ? null : styles.hide } onClick={() => history.push('/RejectReport')}>
                            Barang Reject
                        </div>
                    </div>
                    <div style={styles.contentStyle}>
                        {viewContent}
                    </div>
                </div>
                <button style={fab? styles.fab : {display: 'none'}} onClick={() => this.onFabPress(true)}>
                    <FaPlus size={20} color='#f1f1f1' />
                </button>
            </div>
        );
    }
}

const styles = {
    globalWrapper: {
        height: window.innerHeight,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden'
    },
    headContainer: {
        borderBottom: '0.5px solid',
        borderColor: '#393939',
        backgroundColor: '#282828',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: window.innerHeight * 0.05
    },
    menuSeparator: {
        color: '#e3e3e3',
        fontWeight: 'bold',
        fontFamily: 'Titillium Web',
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: window.innerHeight * 0.95,       
    },
    sidebarStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#333333',
        borderRight: '0.5px solid',
        borderColor: '#393939',
        paddingTop: 25,
    },
    contentStyle: {
        flex: 6,
        backgroundColor: '#f1f1f1',
        overflowY: 'scroll',
        height: 'auto'
    },
    fab: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c0392b',
        borderRadius: '50%',
        position: 'fixed',
        bottom: '10%',
        right: '7%',
        height: 60,
        width: 60,
        zIndex: 2,
        border: 'none', 
    },
    logoContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    logoStyle: {
        objectFit: 'contain',
        height: '85%',
    },
    logoTextStyle: {
        objectFit: 'contain',
        height: '70%',
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        flex: 1,
    },
    separatorContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 28,
        paddingLeft: 5,
        marginTop: 15,
        marginBottom: 10,
        borderBottom: '2px #e3e3e3 solid',
        paddingRight: 5,
        cursor: 'pointer'
    },
    show: {
        transision: 0.5,
    },
    hide: {
        display: 'none',
    },

}

export default Dashboard;