import React from 'react';
import DatePicker from 'react-datepicker';
import '../../css/input.css';

export const FormDatePicker = ({width, marginLeft, placeholder, style, label, onChange=null, selected = new Date }) => {
    return(
        <div style={{...styles.wrapperStyle, width, marginLeft}}>
            <div style={styles.labelStyle}>{label}</div>
            <div style={styles.inputWrapper}>
                <DatePicker selected={selected} className='datePickerInput' onChange={onChange} />
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
