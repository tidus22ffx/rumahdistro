import React, { Component } from 'react';
import '../../css/input.css';

export const  ButtonTransparent = ({width, height = 35, onClick, className, children, style}) => {
    console.log(className);
    return(
        <button className={className} style={{height:height, width:width, ...style}} onClick={onClick}> 
            {children}
        </button>
    );
}

const styles = {
    buttonStyle: {
        border: '2px solid',
        borderColor: '#808080',
        width: '80%',
        height: 40,
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '0.2s',
        borderRadius: 3,
        fontWeight: 600,
        color: '#808080', 
      }
}