import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './screen/Home';
import Portfolio from './components/Portfolios/Portfolio';
import PortfolioOperations from './components/Portfolios/PortfolioOperations';
import PortfolioOrders from './components/Portfolios/PortfolioOrders';
import PortfolioFiscalReport from './components/Portfolios/PortfolioFiscalReport';
import SharedPortfolios from './components/Portfolios/SharedPortfolios';
import Subscriptions from './components/Subscriptions/Subscriptions';
import Subscription from './components/Subscriptions/Subscription';
import Payment from './components/Payments/Payment';
import PaymentOk from './components/Payments/PaymentOk';
import PaymentError from './components/Payments/PaymentError';
import SavingsPlans from './components/SavingsPlans/SavingsPlans';
import Login from "./screen/Login";
import Instruments from './components/Instruments/Instruments';
let routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/instruments" component={Instruments} />
    <Route exact path="/portfolio" component={Portfolio} />
    <Route path="/portfolio/operations" component={PortfolioOperations} />
    <Route path="/portfolio/orders" component={PortfolioOrders} />
    <Route path="/portfolio/fiscal_report" component={PortfolioFiscalReport} />
    <Route path="/shared_portfolios" component={SharedPortfolios} />
    <Route path="/subscriptions" component={Subscriptions} />
    <Route path="/subscription/:subscriptionId" component={Subscription} />
    <Route exact path="/payment" component={Payment} />
    <Route path="/payment/ok" component={PaymentOk} />
    <Route path="/payment/error" component={PaymentError} />
    <Route path="/savings-plans" component={SavingsPlans} />
    <Route path="/login" component={Login} />
  </Switch>
);

export default routes;
