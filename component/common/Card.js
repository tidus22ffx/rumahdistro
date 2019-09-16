import React, { Component } from 'react';

export const CardView = ({backgroundColor = null, width = null, height = null, style, children}) => {
    return (
        <div style={{...style, ...styles, backgroundColor, width, height}}>
            {children}
        </div>
    );
}

const styles = {
    borderRadius: 3,
    //border: '1px solid',
    borderColor: 'white', 
}
