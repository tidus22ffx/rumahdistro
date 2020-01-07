import React from 'react';
import Select from 'react-select';
import '../../css/input.css';

export const ComboBox = ({
    disabled,
    width, 
    placeholder, 
    selectedOption=null, 
    options, 
    style, 
    label, 
    onChange=null }) => {

    const opt = () => {
        if(options===null){
            return [
                {
                    label: 'NO DATA',
                    value: null,
                }
            ]
        }
        return options;
    }
    
    return(
        <div style={{...styles.wrapperStyle, width}}>
            <div style={styles.labelStyle}>{label}</div>
            <div style={styles.inputWrapper}>
                <Select 
                    placeholder={placeholder}
                    isSearchable
                    options={opt()}
                    value={selectedOption} 
                    styles={styles.inputStyle} 
                    isDisabled={disabled}
                    onChange={(item) => onChange(item)} />
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


    },
    inputStyle: {
        container: (provided, state) => ({
            ...provided,
            outline: 'none',
            borderStyle: 'none',
            paddingBottom: 2,
            paddingLeft: 2,
            height: 25,
        }),
        control: (provided, state) => ({
            ...provided,
            fontFamily: 'Titillium Web',
            color: '#333333',
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: 'transparent',
            borderStyle: 'none',
            border: 'none',
            height: '100%',
            width: '100%',
            padding: 0,
            boxShadow: 'none',
            minHeight: 25,
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height:'100%',
            padding: 0,
            paddingBottom: 10,
            marginBottom: 10,
            position: 'initial',
            fontSize: 14,
            fontWeight: 600,

        }),
        input: (provided, state) => ({
            height:25,
            padding: 0,
            margin: 0,
            paddingBottom: 2,
            fontFamily: 'Titillium Web',
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: 'none',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            padding: 0,
        }),
    }
}
