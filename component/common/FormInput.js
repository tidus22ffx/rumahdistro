import React from 'react';
import CurrencyInput from 'react-currency-input';

export const FormInput = ({width, type='text', value, readonly=false, placeholder, style, label, onChangeText=null}) => {
    return(
        <div style={{...styles.wrapperStyle, width, ...style}}>
            <div style={styles.labelStyle}>{label}</div>
            <div style={styles.inputWrapper}>
                <input type={type} placeholder={placeholder} readOnly={readonly} value={value} style={styles.inputStyle} onChange={onChangeText} />
            </div>
        </div>
    );
}

export const MoneyInput = ({width, type='text', value, readonly=false, placeholder, style, label, onChangeText=null}) => {
    return(
        <div style={{...styles.wrapperStyle, width, ...style}}>
            <div style={styles.labelStyle}>{label}</div>
            <div style={styles.inputWrapper}>
                <CurrencyInput 
                    prefix='Rp ' 
                    decimalSeparator="," 
                    thousandSeparator="." 
                    precision={0}
                    placeholder={placeholder} 
                    readOnly={readonly} 
                    value={value} 
                    style={styles.inputStyle} 
                    onChangeEvent={(e, m, value) => onChangeText(value)} />
            </div>
        </div>
    );
}

const styles = {
    wrapperStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        margin: 4,
    },
    labelStyle: {
        fontFamily: 'Titillium Web',
        color: '#999999',
        fontSize: 12,
    },
    inputWrapper: {
        height: 25,
        borderBottom: '1px solid #999999',
        paddingBottom: 2,
        paddingLeft: 2,

    },
    inputStyle: {
        fontFamily: 'Titillium Web',
        color: '#333333',
        fontSize: 14,
        fontWeight: 600,
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
    }
}
