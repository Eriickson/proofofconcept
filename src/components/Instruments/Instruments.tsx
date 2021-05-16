import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import DocumentTitle from 'react-document-title';
import FundService from '../../services/FundService';
import funds from '../../services/FundService';
import { List, DetailsList, IColumn } from '@fluentui/react';
import axios, { AxiosResponse } from "axios";


const Instruments = () => {
  const proxy = process.env.REACT_APP_PROXY_URL;
  const code = process.env.REACT_APP_PROXY_CODE;
  const [error, setError] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [funds, setFunds] = useState<any[]>([]);


  useEffect(() => {
    console.log("eo")
    setIsLoaded(false);
    
    FundService.getFunds(0, 30, "", null, null, null).then((data)  => {
      console.log(data)
      console.log(typeof data)
      setFunds(data)
      
      setIsLoaded(true)
    });
  }, [proxy, code]);



  // if (error) {
  //   console.log(error);
  //   return (<div>Error: {// @ts-ignore
  //     error.message}</div>)
  // }

  if (!isLoaded || funds === undefined) {
    return (<div>Cargando ...</div>)
  }
  let columns: IColumn[] = [
    { key: 'name', name: 'Nombre', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true }
  ];
  return (
        <DocumentTitle title='IronIA - Fondos de inversión'>
          <div className="ms-Grid-row tight">
            <h2>Configura tu plan de ahorro</h2>
            <p className="description">Configura tu perfil, decide cuanto quieres invertir, cuándo quieres
            desembolsar tu dinero y cómo quieres hacerlo.</p>
            <Separator className="separator" />
            <div className="table-content">
              <DetailsList items={funds} columns={columns}/>
            </div>
          </div>
        </DocumentTitle>
      );
    }


export default Instruments;
