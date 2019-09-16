import React, { Component } from 'react';

export const TextInput = ({ icon = null, width, children, placeholder, onChangeText=null, type='text' }) => {
    const IconTag = icon;
    return (
        <div style={{...styles.containerStyle, width}}>
            <div style={styles.iconContainer}>
                <IconTag color='white' />
            </div>
            <div style={styles.textContainer}>
                <input type={type} onChange={(text) => onChangeText(text)} style={styles.inputStyle} placeholder={placeholder}/>
            </div>
        </div>
    );
} 

const styles={
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 3,
        height: 30,
        border: '1px solid'
    },
    iconContainer: {
        flex: 1,
        height: '100%',
        display: 'flex',
        backgroundColor: '#010101',
        justifyContent: 'center',
        alignItems: 'center',
         
    },
    textContainer: {
        flex: 6,
        paddingLeft: 5,
        backgroundColor: 'white', 
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
    inputStyle: {
        width: '90%', 
        border: 'none transparent', 
        boxShadow: 'none',
        margin: 0, 
        padding: 0, 
        height: 30, 
        borderTopRightRadius: 3, 
        borderBottomRightRadius: 3,
        outline: '0px !important',
        WebkitAppearance: 'none',
    },
}