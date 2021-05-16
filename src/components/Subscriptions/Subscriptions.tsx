import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import DocumentTitle from 'react-document-title';
import './Subscriptions.sass';

const Subscriptions = () => {
  const proxy = process.env.REACT_APP_PROXY_URL;
  const code = process.env.REACT_APP_PROXY_CODE;
  const [error, setError] = useState({status: false});
  const [isLoaded, setIsLoaded] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${proxy}/Subscriptions?code=${code}&clientId=default`, {
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
                setSubscriptions(body);
              });
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [proxy, code]);

  if (error.status) {
    return (<div>Error: {// @ts-ignore
      error.message}</div>)
  }

  if (!isLoaded || subscriptions === undefined || subscriptions.length === 0) {
    return (<div>Cargando ...</div>)
  }

  return (
        <DocumentTitle title='IronIA - Suscripciones'>
          <div className="ms-Grid-row tight">
            <h2>Elige tu plan</h2>
            <p className="description">Suscríbete en IRONIA y disfruta de todas las ventajas de llevar tu cartera de inversiones a otro nivel.</p>
            <Separator className="separator" />
            <div className="table-content">
              <table className="subscriptions">
                <thead>
                  <tr>
                    <th></th>
                    {subscriptions.map((subscription) => (

                      <th  // @ts-ignore
                          className={subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <div className="attribute">
                          { // @ts-ignore
                            subscription.FreeDays > 0 &&
                            <div className="free-days">30 días gratis</div>
                          }
                          { // @ts-ignore
                            subscription.Recommended &&
                            <div className="recommended">Recomendado</div>
                          }
                        </div>
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <th></th>
                    {subscriptions.map((subscription) => (
                      <th className={ // @ts-ignore
                        subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <div className="name">
                          { // @ts-ignore
                            subscription.Name}
                        </div>
                        <div className="description">
                          { // @ts-ignore
                            subscription.Description}
                        </div>
                        <div className="price">
                          { // @ts-ignore
                            subscription.Price}<span>€/mes</span>
                        </div>
                        <div className="action">
                          <Link  // @ts-ignore
                              to={`/subscription/${subscription.Id}`} className={"button " + (subscription.Default ?  "seconday-button" : "primary-button")}>
                            { // @ts-ignore
                              subscription.ActionText}
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Más de 18.000 fondos para invertir</td>
                    {subscriptions.map((subscription) => (
                      <td className={ // @ts-ignore
                        subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <i className="ironia-icon check" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Intelgicencia Artificial para seleccionar fondos</td>
                    {subscriptions.map((subscription) => (
                      <td className={  // @ts-ignore
                        subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <i className="ironia-icon check" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Sin comisiones por operación</td>
                    {subscriptions.map((subscription) => (
                      <td className={ // @ts-ignore
                        subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <i className="ironia-icon check" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Libertad de gestión</td>
                    {subscriptions.map((subscription) => (
                      <td className={ // @ts-ignore
                        subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <i className="ironia-icon check" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Devolución de incentivos de gestoras a los clientes</td>
                    {subscriptions.map((subscription) => (
                      <td className={ // @ts-ignore
                        subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <i className="ironia-icon check" />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Asesoramientio sobre tu cartera</td>
                    {subscriptions.map((subscription) => (
                      <td className={ // @ts-ignore
                        subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <i  // @ts-ignore
                            className={"ironia-icon " + (subscription.Advised ? 'check' : 'cross')} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>Educación personalizada #moneygym</td>
                    {subscriptions.map((subscription) => (
                      <td  // @ts-ignore
                          className={subscription.Recommended ? 'recommended' : ''} key={subscription.Id}>
                        <i  // @ts-ignore
                            className={"ironia-icon " + (subscription.Advised ? 'check' : 'cross')} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td></td>
                    {subscriptions.map((subscription) => (
                        // @ts-ignore
                      <td className={subscription.Recommended ? 'recommended' : ''} key={subscription.Id}></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </DocumentTitle>
      );
    }


export default Subscriptions;
