import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import {FormInput, FormDatePicker, ListView, ComboBox, ButtonTransparent} from './common';
import { Line } from 'react-chartjs-2';
import '../css/input.css';

class Report extends Component {
    // constructor(props){
    //     super(props);
    //     this.props = {
    //         popupOpen: props.popupOpen,
    //         date: props.date,
    //         month: props.month,
    //         year: props.year,
    //         loading: props.loading,
    //     }
    // }

    renderHeader(){
        const { headerContainer } = styles;
        return (
            <div style={styles.headerStyle}>
                <div style={{borderBottom: '3px solid #c39243'}}>
                    {this.props.headerText}
                </div>
            </div>
        )
    }

    renderControl(){
        const { controlItemContainer } = styles;
        return this.props.control.map((item) => {
            if(item === 'year') {
                const options = [];
                const thisYear = new Date().getFullYear();
                for (let index = 2017; index <= thisYear; index++) {
                    options.push({
                        label: index.toString(),
                        value: index,
                    });
                }

                return (
                    <div style={controlItemContainer}>
                        <ComboBox 
                            label='Tahun' 
                            placeholder='Pilih Tahun'
                            selectedOption={this.props.year}
                            options={options}
                            onChange={(item) => this.props.setYear(item)}
                            width='50%'
                        />
                    </div>
                )
            } else if(item === 'month') {
                const options = [
                    {
                        label: 'Januari',
                        value: 1,
                    },
                    {
                        label: 'Februari',
                        value: 2,
                    },
                    {
                        label: 'Maret',
                        value: 3,
                    },
                    {
                        label: 'April',
                        value: 4,
                    },
                    {
                        label: 'Mei',
                        value: 5,
                    },
                    {
                        label: 'Juni',
                        value: 6,
                    },
                    {
                        label: 'Juli',
                        value: 7,
                    },
                    {
                        label: 'Agustus',
                        value: 8,
                    },
                    {
                        label: 'September',
                        value: 9,
                    },
                    {
                        label: 'Oktober',
                        value: 10,
                    },
                    {
                        label: 'November',
                        value: 11,
                    },
                    {
                        label: 'Desember',
                        value: 12,
                    },
                ];
                return (
                    <div style={controlItemContainer}>
                        <ComboBox 
                            label='Bulan' 
                            placeholder='Pilih Bulan'
                            selectedOption={this.props.month}
                            options={options}
                            onChange={(item) => this.props.setMonth(item)}
                            width='50%'
                        />
                    </div>
                )
            } else if(item === 'date') {
                const options = [];
                const date = new Date();
                const lastDate = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
                console.log(lastDate);
                for (let index = 1; index <= lastDate; index++) {
                    options.push({
                        label: index < 10 ? '0' + index : index.toString(),
                        value: index,
                    });
                }
                return (
                    <div style={controlItemContainer}>
                        <ComboBox 
                            label='Tanggal' 
                            placeholder='Pilih Tanggal'
                            selectedOption={this.props.date}
                            options={options}
                            onChange={(item) => this.props.setDate(item)}
                            width='50%'
                        />
                    </div>
                )
            } else {
                const { label, options, selectedItem, onChange } = item;
                return (
                    <div style={controlItemContainer}>
                        <ComboBox 
                            label={label} 
                            placeholder={`Pilih ${label}`}
                            selectedOption={selectedItem}
                            options={options}
                            onChange={(selected) => onChange(selected)}
                            width='50%'
                        />
                    </div>
                )
            }
        });
    }

    renderLineChart(){
        const { labels, dataset } = this.props;
        return dataset.map((item) => {
            const getRandomColor = () => {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            const color = getRandomColor();
            const renderDataSet =
            [
                {
                    label: item.label,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: color,
                    borderColor: color,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: color,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: color,
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: item.data
                }
            ]
            const data = {
                labels: labels,
                datasets: renderDataSet
            };
            return (
                <div style={{ width: '45%'}}>
                    <Line data={data} width={10} height={10} options={{maintainAspectRatio: false}} />
                </div>
            )
        })
    }
    
    renderUnprocessedTable(){
        const { labels, dataset } = this.props;

    }

    renderChart(){
        const { chartType } = this.props;
        if(chartType === 'line') {
            console.log('props', this.props);
            return this.renderLineChart();
        } else if (chartType === 'bar') {
            return null;
        } else if (chartType === 'pie') {
            return null;
        } else {
            return null;
        }
    }

    renderTable(){
        const { children } = this.props;
        return children;
    }

    renderBody(){
        if(this.props.loading){
            return (
                <div style={styles.loaderContainer}>
                    <Loader type="Puff" color="#c39243" height={25} width={25}/> 
                </div>
            )
        }

        return (
            <div style={styles.bodyStyle}>
                <div 
                    style={{ 
                        height: window.innerHeight * 0.5, 
                        width: '90%', 
                        display: this.props.chartType === 'none' ? 'none' : 'flex',
                        flexDirection: 'row', 
                        //border: '1px solid',
                        justifyContent: 'space-around',
                        alignSelf: 'center',
                        marginTop: 30
                    }}
                >
                    {this.renderChart()}
                </div>
                    {this.renderTable()}
            </div>
        );
    }

    render(){
        const { globalContainer, controlContainer, buttonContainer } = styles;
        

        return(
            <div style={globalContainer}>
                {this.renderHeader()}
                <div style={controlContainer}>
                    {this.renderControl()}
                    <div style={buttonContainer}>
                        <ButtonTransparent 
                            className='buttonTransparent' 
                            width='20%'
                            onClick={() => this.props.search()}
                        > Cari </ButtonTransparent>
                    </div>
                </div>
                {this.renderBody()}                
            </div>
        )
    }
}

const styles = {
    globalContainer: {
        flex: 1,
        height: 'auto',
        overflowY: 'hidden',
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerStyle: {
        fontSize: 32,
        fontWeight: 600,
        color: '#c39243',
        fontFamily: 'Titillium Web',
    },
    controlContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: '0.1px solid #999999',
    },
    controlItemContainer: {
        width: '33.33%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 5
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Report;