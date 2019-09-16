import React, { Component } from 'react';
import { ButtonTransparent } from './';
import '../../css/ListView.css';

export const ListView = ({columns = ['Id', 'First Name', 'Last Name', 'Avatar'], data = [], onClick}) => {
    const renderHeader = () => {
        return columns.map((item, index) => {
            return (
                <div style={styles.headerColumn}>{item}</div>
            );
        })
    };

    const renderContentItem = (item) => {
        return Object.keys(item).map(key => {
            if(typeof(item[key]) === 'object' && item[key] !== null){
                return <div style={styles.contentItem}>{item[key].name}</div>;
            }
                return <div style={styles.contentItem}>{item[key]}</div>;
        })
    }

    const renderContent = (primary = 'id') => {
        if(data.length < 1){
            return null;
        }
        return data.map((item, index) => 
            <div className='contentItemWrapper' onClick={() => onClick(item)}>
                {renderContentItem(item)}
            </div>        
        );
    } 

    console.log(renderContent())
    
    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                {renderHeader()}
            </div>
            <div style={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        width: '100%',
        minHeight: 300,
        //border: '1px solid white',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        height: 25,
        fontFamily: 'Titillium Web',
        fontSize: 14,
        color: '#808080',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        paddingLeft: 10,
        //border: '1px solid red',
    },
    headerColumn: {
        flex: 1, 
        height: '100%', 
        width: '100%',
        fontWeight: 600
    },
    content: {
        height: 'auto',
        borderBottom: '0.1px solid #999999',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contentItemWrapper: {
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '0.5px solid #999999',
        paddingLeft: 10,
        paddingBottom: 5,
        alignItems: 'flex-end'
    },
    contentItem: {
        flex: 1,
        color: '#262526',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Titillium Web',
        flexWrap: 'wrap',
    }
}