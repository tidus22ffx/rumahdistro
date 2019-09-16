import React, { Component } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { ButtonTransparent } from './';

export const PopupMenu = ({ width='50%', height='auto', buttonList, title, children, onClose }) => {
    return (
        <div style={styles.wrapper}>
            <div style={{...styles.contentWrapper, height, width}}>
                <div style={styles.headerStyle}>
                    <div style={{width:'90%', paddingLeft: 10,}}>Header</div>
                    <button style={styles.closeButtonStyle} onClick={onClose}>
                        <FaWindowClose width='100%' height='100%' color='#c0392b' />
                    </button>
                </div>
                <div style={styles.bodyStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(15,15,15,0.7)',
        zIndex: 2,
    },
    contentWrapper: {
        margin: 'auto',
    },
    headerStyle: {
        flex: 1,
        backgroundColor: '#333333',
        opacity: 100,
        color: '#e3e3e3',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Titillium Web',
    },
    bodyStyle: {
        flex: 8,
        backgroundColor: '#f1f1f1',
        opacity: 100,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        display: 'flex',
        flexDirection: 'column'
    },
    closeButtonStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
    }
}
