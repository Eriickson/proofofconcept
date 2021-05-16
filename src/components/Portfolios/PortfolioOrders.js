import React, { useState, useEffect, useContext } from 'react';
import DocumentTitle from 'react-document-title';
import OperationsTable from '../OperationsTable';

const PortfolioOrders = () => {
  const proxy = process.env.REACT_APP_PROXY_URL;
  const code = process.env.REACT_APP_PROXY_CODE;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reporting, setReporting] = useState([]);
  const [funds, setFunds] = useState([]);
  const date_from = ( function(){this.setDate(this.getDate()-1); this.setMonth(this.getMonth()-3); return this} ).call(new Date());
  const date_to = ( function(){this.setDate(this.getDate()-1); return this} ).call(new Date());
  const date_from_text = date_from.getFullYear().toString()  + ("0" + (date_from.getMonth()+1)).slice(-2) + ("0" + date_from.getDate()).slice(-2);
  const date_to_text = date_to.getFullYear().toString() + ("0" + (date_to.getMonth()+1)).slice(-2) + ("0" + date_to.getDate()).slice(-2);

  const user = {};

  useEffect(() => {
    setIsLoaded(false);
    if (typeof user.portfolios != "undefined" && user.portfolios['0']) {
      const portfolio_id = user.portfolios[0].FinametrixId;
      fetch(`${proxy}/Reporting?code=${code}&clientId=default&portfolioIds=${portfolio_id}&dateFrom=${date_from_text}&dateTo=${date_to_text}&analyzeBy=assetclasses`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          }
        })
        .then(
          (result) => {
            if (result.ok) {
              setIsLoaded(true);
              result.json()
                .then((body) => {
                  setReporting(body);
                });
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [proxy, code, date_from_text, date_to_text, user]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    if (!isLoaded || reporting === undefined || reporting.length === 0) {
      return <div>Cargando ...</div>;
    } else {
      return (
        <DocumentTitle title='IronIA - Órdenes en curso'>
          <>
            <h2>Información fiscal</h2>
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <div className="shadow">
                  <OperationsTable reporting={reporting}/>
                </div>
              </div>
            </div>
          </>
        </DocumentTitle>
      );
    }
  }
}

export default PortfolioOrders;
