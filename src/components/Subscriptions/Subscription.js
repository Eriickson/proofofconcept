import React, { useState, useEffect, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import PersonForm from './PersonForm';
import { Text } from '@fluentui/react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import DocumentTitle from 'react-document-title';
import './Subscriptions.sass';

const Subscription = () => {
  const proxy = process.env.REACT_APP_PROXY_URL;
  const code = process.env.REACT_APP_PROXY_CODE;
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [subscription, setSubscription] = useState({});
  const [person, setPerson] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const history = useHistory();
  const user = {};
  const { subscriptionId } = useParams();

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${proxy}/Subscription?code=${code}&clientId=default&subscriptionId=${subscriptionId}`, {
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
                setSubscription(body);
                user.subscription = body;
              });
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [proxy, code, subscriptionId, user]);

  const createPerson = (data) => {
    fetch(`${proxy}/Person?code=${code}&clientId=default`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: JSON.stringify({
        Email: data.email,
        FirstName: data.first_name,
        LastName: data.last_name,
        SecondLastName: data.second_last_name,
        Birthday: data.birthday,
        CountryCode: data.country_code,
        Phone: data.phone,
        UserId: user.id
      })
    })
    .then((result) => {
      if (result.ok) {
        setIsLoaded(true);
        result.json()
        .then((body) => {
          user.person = {
            id: body.Id,
            email: data.Email,
            first_name: data.FirstName,
            last_name: data.LastName,
            second_last_name: data.SecondLastName,
            birthday: data.Birthday,
            country_code: data.CountryCode,
            phone: data.Phone
          };
          history.push(`/payment?subscriptionId=${subscriptionId}`);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        });
      }
    },
    (error) => {
      setIsLoaded(true);
      setError(error);
    });
  };

  const createOrder = (event) => {
    event.preventDefault();
    if (user.id === undefined) {
      fetch(`${proxy}/User?code=${code}&clientId=default&Oid=${user.oid}`, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
        },
        body: JSON.stringify({
          Email: user.email,
          Status: 2
        })
      })
      .then((result) => {
        if (result.ok) {
          setIsLoaded(true);
          result.json()
          .then((body) => {
            user.id = body.Id;
            createPerson(person);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          });
        }
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      });
    } else {
      createPerson(person);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    if (!isLoaded || subscription === undefined) {
      return <div>Cargando ...</div>;
    } else {
      return (
        <DocumentTitle title={`IronIA - Suscripción ${subscription.Name}`}>
          <>
            <div className="ms-Grid-row">
              <Link to="/subscriptions" className="back-link">
                Volver atrás
              </Link>
            </div>
            <div className="ms-Grid-row strait">
              <h2>Suscríbete ya a Ironia Fintech</h2>
              <p className="description">Inserta tus datos personales, realiza el pago y empieza a invertir en Ironia.</p>
              <Separator />
            </div>
            <div className="ms-Grid-row strait">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-lg7">
                  <div className="shadow medium">
                    <h3 className="green">
                      <i className="ironia-icon check green circled small"/> Registro / Inicio de sesión
                    </h3>
                    <div className="blue">
                      <Text block>Inicio de sesión como <span className="blue">{user.email}</span></Text>
                      <a href={process.env.REACT_APP_SERVER_HOST+'/logout'}>
                        Iniciar sesión
                      </a> con otra cuenta.
                    </div>
                  </div>
                  <div className="shadow medium">
                    <h3>
                      <span className="red circled small">2</span> Datos del titular de la cuenta
                    </h3>
                    <Text block className="legend">Asocia y vincula un titular a esta cuenta</Text>
                    <PersonForm email={user.email} setPerson={setPerson} setIsButtonDisabled={setIsButtonDisabled} />
                  </div>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg5">
                  <div className="shadow medium summary">
                    <h3>Resumen del pedido</h3>
                    <Text>Plan<span className="right">{subscription.Name}</span></Text>
                    <Separator />
                    { subscription.FreePeriods > 0 &&
                      <>
                        <Text>Prueba gratuita<span className="right">{subscription.FreePeriods} {subscription.Period}</span></Text>
                        <Separator />
                      </>
                    }
                    { subscription.Period === 'month' &&
                      <Text block className="total">Facturación Mensual<span className="right">{subscription.Price}€</span></Text>
                    }
                    { subscription.Period === 'year' &&
                      <Text block className="total">Facturación Anual<span className="right">{subscription.Price}€</span></Text>
                    }
                    <button className={"button secondary-button " + (isButtonDisabled ? 'disabled' : '')} disabled={isButtonDisabled} onClick={createOrder}>Realizar pago</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </DocumentTitle>
      );
    }
  }
};

export default Subscription;
