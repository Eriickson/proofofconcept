import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RootStateOrAny, useSelector } from "react-redux";

import Home from "../screen/Home";
import Portfolio from "../components/Portfolios/Portfolio";
import PortfolioOperations from "../components/Portfolios/PortfolioOperations";
import PortfolioOrders from "../components/Portfolios/PortfolioOrders";
import PortfolioFiscalReport from "../components/Portfolios/PortfolioFiscalReport";
import SharedPortfolios from "../components/Portfolios/SharedPortfolios";
import Subscriptions from "../components/Subscriptions/Subscriptions";
import Subscription from "../components/Subscriptions/Subscription";
import Payment from "../components/Payments/Payment";
import PaymentOk from "../components/Payments/PaymentOk";
import PaymentError from "../components/Payments/PaymentError";
import SavingsPlans from "../components/SavingsPlans/SavingsPlans";
import Instruments from "../components/Instruments/Instruments";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../screen/Login";
import App from "../App";
import { SearchScreen } from "../screen/SearchScreen";

function Rutas(props: any) {
  const isAuthenticated = useSelector((state: RootStateOrAny) => state.auth.isAuthenticated);

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div>
      <BrowserRouter>
        <Route
          render={(props) => (
            <App>
              <Switch>
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute exact path="/portfolio" component={Portfolio} />
                <ProtectedRoute path="/portfolio/operations" component={PortfolioOperations} />
                <ProtectedRoute path="/portfolio/orders" component={PortfolioOrders} />
                <ProtectedRoute path="/portfolio/fiscal_report" component={PortfolioFiscalReport} />
                <ProtectedRoute path="/shared_portfolios" component={SharedPortfolios} />
                <ProtectedRoute path="/subscriptions" component={Subscriptions} />
                <ProtectedRoute path={`/subscription/:subscriptionId`} component={Subscription} />
                <ProtectedRoute exact path="/payment" component={Payment} />
                <ProtectedRoute path="/payment/ok" component={PaymentOk} />
                <ProtectedRoute path="/payment/error" component={PaymentError} />
                <ProtectedRoute path="/savings-plans" component={SavingsPlans} />
                <ProtectedRoute path="/search" component={SearchScreen} />
                <ProtectedRoute path="/instruments" component={Instruments} />
                <ProtectedRoute path="/login" component={Login} />
              </Switch>
            </App>
          )}
        />
      </BrowserRouter>
    </div>
  );
}
export default Rutas;
