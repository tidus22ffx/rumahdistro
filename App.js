import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Store from './store/store';
import LoginScreen from './screen/LoginScreen';
import Dashboard from './screen/Dashboard';
import HomeScreen from './screen/HomeScreen';
import OperationalScreen from './screen/OperationalScreen';
import PurchaseScreen from './screen/PurchaseScreen';
import ProductScreen from './screen/ProductScreen';
import './App.css';
import CategoryScreen from './screen/CategoryScreen';
import UserScreen from './screen/UserScreen';
import OrderScreen from './screen/OrderScreen';
import RejectScreen from './screen/RejectScreen';
import YearlyReport from './screen/YearlyReport';
import MonthlyReport from './screen/MonthlyReport';
import DailyReport from './screen/DailyReport';
import OperationalReport from './screen/MonthlyOperationalReport';
import RejectReport from './screen/RejectReport';
import MonthlyStockReport from './screen/MonthlyStockReport';
import RedirectScreen from './screen/RedirectScreen';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={RedirectScreen} exact />
            <Route path="/Login" component={LoginScreen} />
            <Route path="/Home" component={HomeScreen} />
            <Route path="/Product" component={ProductScreen} />
            <Route path="/Category" component={CategoryScreen} />
            <Route path="/Purchase" component={PurchaseScreen} />
            <Route path="/Operational" component={OperationalScreen} />
            <Route path="/User" component={UserScreen} />
            <Route path="/Order" component={OrderScreen} />
            <Route path="/Reject" component={RejectScreen} />
            <Route path="/YearlyReport" component={YearlyReport} />
            <Route path="/MonthlyReport" component={MonthlyReport} />
            <Route path="/DailyReport" component={DailyReport} />
            <Route path="/OperationalReport" component={OperationalReport} />
            <Route path="/RejectReport" component={RejectReport} />
            <Route path="/MonthlyStockReport" component={MonthlyStockReport} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
