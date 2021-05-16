import React, {useContext, useEffect, useState} from 'react';
import DocumentTitle from 'react-document-title';
import CardsSection from '../CardsSection';
import {Separator} from 'office-ui-fabric-react/lib/Separator';
import Highstock from '../Highstock';
import PieHighstock from '../PieHighstock';

import {ComboBox, SelectableOptionMenuItemType} from 'office-ui-fabric-react/lib/index';
import OperationsTable from '../OperationsTable';
import './Portfolio.sass';

const Portfolio = () => {
  const proxy = process.env.REACT_APP_PROXY_URL;
  const code = process.env.REACT_APP_PROXY_CODE;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [reporting, setReporting] = useState([]);
  const [funds, setFunds] = useState([]);

  const date_from = ( function(){this.setDate(this.getDate()-1); this.setMonth(this.getMonth()-3); return this} ).call(new Date());
  const date_to = ( function(){this.setDate(this.getDate()-1); return this} ).call(new Date());
  const date_from_text = date_from.getFullYear().toString()  + ("0" + (date_from.getMonth()+1)).slice(-2) + ("0" + date_from.getDate()).slice(-2);
  const date_to_text = date_to.getFullYear().toString() + ("0" + (date_to.getMonth()+1)).slice(-2) + ("0" + date_to.getDate()).slice(-2);
  const [dateFrom, setDateFrom] = useState(date_from_text);
  const [dateTo, setDateTo] = useState(date_to_text);

  const INITIAL_OPTIONS= [
    { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C' },
    { key: 'D', text: 'Option D' },
    { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
    { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
    { key: 'E', text: 'Option E' },
    { key: 'F', text: 'Option F', disabled: true },
    { key: 'G', text: 'Option G' },
    { key: 'H', text: 'Option H' },
    { key: 'I', text: 'Option I' },
    { key: 'J', text: 'Option J' },
  ];

  const user = {};

  useEffect(() => {
    if (isLoaded) {
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
      } else {
        setIsLoaded(true);
      }
    }
  }, [proxy, code, dateFrom, dateTo, user]);

  if (error) {
    return (
        <DocumentTitle title='IronIA - Resumen de cartera'>
          <div>Error: {error.message}</div>
        </DocumentTitle>
    );
  } else {
    if (!isLoaded || reporting === undefined || reporting.length === 0) {
      return (
          <DocumentTitle title='IronIA - Resumen de cartera'>
            <div>Cargando ...</div>
          </DocumentTitle>
      )
    } else {
      return (
          <DocumentTitle title='IronIA - Resumen de cartera'>
            <>
              <h2>Resumen de cartera</h2>
              <Separator />
              <CardsSection reporting={reporting} user={user} />
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-lg8">
                  <div className="shadow">
                    <Highstock reporting={reporting} />
                    <Separator />
                    <h3>Comparar fondos</h3>
                    <ComboBox
                        label="Selecciona tantas carteras como quieras y compara su rentabilidad en el tiemnpo con tu cartera de inversiones."
                        allowFreeform="true"
                        autoComplete='on'
                        options={INITIAL_OPTIONS}
                        placeholder="Selecciona una o más carteras"
                        multiple="true"
                    />
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg4">
                  <div className="shadow">
                    <PieHighstock reporting={reporting} />
                  </div>
                </div>
              </div>
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

export default Portfolio;
