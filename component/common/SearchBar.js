import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FormDatePicker} from './';

export const SearchBar = (label, onChange, date, width) => {
    return (
        <FormDatePicker 
            width
            selected={date} 
            onChange
            label
            placeholder="Filter berdasarkan tanggal" 
        />
    );
} 