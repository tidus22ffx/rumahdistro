import axios from 'axios';

export const getYearlyReport = (year = new Date().getFullYear()) => {
    return (dispatch) => {
        dispatch({ type: 'GET_YEARLY_REPORT'});
        axios.get('http://localhost:8088/RDSdev/orderH/reportIncomePerMonth/' + year )
        .then((response) => {
            console.log(response);
            const data = response.data;
            getYearlyReportSuccess(dispatch, data.datas);
        }).catch((error) => {
            returnError(dispatch, error);
            console.log(error.response);
        })
    }
};

const getYearlyReportSuccess = (dispatch, data) => {
    let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let qty = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    data.map((item) => {
        sum[item.nomor - 1] = item.income;
        qty[item.nomor - 1] = item.qty;
    })
    dispatch({ 
        type: 'GET_YEARLY_REPORT_SUCCESS',
        payload: data,
        dataset: [
            {
                label: 'Laba',
                data: sum,
            },
            {
                label: 'Item terjual',
                data: qty,
            }
        ]
     });
}

export const getMonthlyReport = (year = new Date().getFullYear(), month = new Date().getMonth()) => {
    return (dispatch) => {
        dispatch({ type: 'GET_MONTHLY_REPORT'});
        axios.get('http://localhost:8088/RDSdev/orderH/reportIncomePerDay/' + year + '/' + month )
        .then((response) => {
            console.log(response);
            const data = response.data;
            getMonthlyReportSuccess(dispatch, data.datas, month, year);
        }).catch((error) => {
            returnError(dispatch, error);
            console.log(error.response);
        })
    }
};

const getMonthlyReportSuccess = (dispatch, data, month, year) => {
    let sum = [];
    let qty = [];
    let labels = [];
    const lastDay = new Date(year, month + 1, 0).getDate();
    const months=[
        '','Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    for(let i = 1; i <= lastDay; i++){
        sum.push([0]);
        qty.push([0]);
        labels.push(['']);    
    }
    data.map((item) => {
        labels[item.nomor] = (item.nomor + ' ' + months[month] + ' ' + year);
        sum[item.nomor] = item.income;
        qty[item.nomor] = item.qty;
    })
    
    dispatch({ 
        type: 'GET_MONTHLY_REPORT_SUCCESS',
        payload: data,
        dataset: [
            {
                label: 'Laba',
                data: sum,
            },
            {
                label: 'Item terjual',
                data: qty,
            }
        ],
        labels: labels
     });
}

export const getDailyReport = (
    year = new Date().getFullYear(), 
    month = new Date().getMonth(),
    date = new Date().getDate(),
    reseller = {
        label: 'semua',
        value: null,
    }
) => {
    let idReseller = '';
    console.log({ reseller });
    if(reseller.value){
        idReseller = '/' + reseller.value.idUser;
    }
    return (dispatch) => {
        dispatch({ type: 'GET_DAILY_REPORT'});
        axios.get('http://localhost:8088/RDSdev/orderH/reportDailyIncome/' + year + '/' + month + '/' + date + idReseller )
        .then((response) => {
            console.log(response);
            const data = response.data;
            getMonthlyReportSuccess(dispatch, data.datas);
        }).catch((error) => {
            returnError(dispatch, error);
            console.log(error.response);
        })
    }
};

export const loadUserReport = () => {
    return (dispatch) => {
      dispatch({ type: 'LOAD_USER_REPORT'});
      axios.get(`http://localhost:8088/RDSdev/user/getAllUser`)
      .then(response => {
          const data = response.data;
          loadUserSuccess(dispatch, data.datas);
      })
      .catch(error => {
          returnError(dispatch, error);
          console.log(error);
      })
    };
}
  
const loadUserSuccess = (dispatch, data) => {
    const combo = () => data.map((item) => {
      return {
        label: item.name,
        value: item,
      };
    })
  
    dispatch({
      type: 'LOAD_USER_REPORT_SUCCESS',
      payload: combo(),
    })
}

export const selectUserReport = (item) => {
    console.log(item);
    return {
        type: 'SELECT_USER_REPORT',
        payload: item,
    }
}

export const getDailyReportSuccess = (dispatch, data) => {
    dispatch({
        type: 'GET_DAILY_REPORT_SUCCESS',
        payload: data,
    })
}

export const getMonthlyOperationalReport = (
    year = new Date().getFullYear(), 
    month = new Date().getMonth()) => {
    return (dispatch) => {
        dispatch({ type: 'GET_MONTHLY_EXPENSES_REPORT'});
        axios.get('http://localhost:8088/RDSdev/operationalH/reportMonthly/' + year + '/' + month)
        .then((response) => {
            console.log(response);
            const data = response.data;
            getOperationalReportSuccess(dispatch, data.datas, month, year);
        }).catch((error) => {
            returnError(dispatch, error);
            console.log(error.response);
        })
    }
};

export const getOperationalReportSuccess = (dispatch, data) => {
    dispatch({
        type: 'GET_MONTHLY_EXPENSES_REPORT_SUCCESS',
        payload: data,
    })
}

export const getRejectReport = (
    year = new Date().getFullYear(), 
    month = new Date().getMonth()) => {
    return (dispatch) => {
        dispatch({ type: 'GET_REJECT_REPORT'});
        axios.get('http://localhost:8088/RDSdev/reject/reportMonthly/' + year + '/' + month)
        .then((response) => {
            console.log(response);
            const data = response.data;
            getRejectReportSuccess(dispatch, data.datas, month, year);
        }).catch((error) => {
            returnError(dispatch, error);
            console.log(error.response);
        })
    }
};

export const getRejectReportSuccess = (dispatch, data) => {
    dispatch({
        type: 'GET_REJECT_REPORT_SUCCESS',
        payload: data,
    })
}


export const setReportDate = (date) => {
    return({
        type: 'SET_DATE',
        payload: date,
    })
}

export const setReportMonth = (month) => {
    return({
        type: 'SET_MONTH',
        payload: month,
    })
}

export const setReportYear = (year) => {
    return({
        type: 'SET_YEAR',
        payload: year,
    })
}

export const getMonthlyStockReport = (year, month, product) => {
    return (dispatch) => {
        dispatch({ type: 'GET_MONTHLY_STOCK_REPORT'});
        axios.get('http://localhost:8088/RDSdev/stock/daily/' + year + '/' + month + '/' + product)
        .then((response) => {
            console.log(response);
            const data = response.data;
            getStockReportSuccess(dispatch, data.datas, month, year);
        }).catch((error) => {
            returnError(dispatch, error);
            console.log(error.response);
        })
    }
}

const getStockReportSuccess = (dispatch, data) => {
    dispatch({
        type: 'GET_STOCK_REPORT_SUCCESS',
        payload: data,
    })
}

export const loadProductReport = () => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_PRODUCT_REPORT'});
        axios.get(`http://localhost:8088/RDSdev/product/getAllProduct`)
        .then(response => {
            const data = response.data;
            loadProductSuccess(dispatch, data.datas);
        })
        .catch(error => {
            returnError(dispatch, error);
            console.log(error);
        })
      };
}

const loadProductSuccess = (dispatch, data) => {
    const combo = () => data.map((item) => {
      return {
        label: item.productName,
        value: item,
      };
    })
  
    dispatch({
      type: 'LOAD_PRODUCT_REPORT_SUCCESS',
      payload: combo(),
    })
}

export const selectProductReport = (item) => {
    return {
        type: 'SELECT_PRODUCT_REPORT',
        payload: item,
    }
}

const returnError = (dispatch, error) => {
    dispatch({
        type: 'ERROR',
        payload: error.toString(),
    });
}