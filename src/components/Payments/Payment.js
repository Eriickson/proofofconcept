import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Moment from 'moment';
import {Stack} from 'office-ui-fabric-react/lib/Stack';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {Dropdown} from 'office-ui-fabric-react/lib/Dropdown';
import {Separator} from 'office-ui-fabric-react/lib/Separator';
import DocumentTitle from 'react-document-title';
import './Payments.sass';

const proxy = process.env.REACT_APP_PROXY_URL;
const code = process.env.REACT_APP_PROXY_CODE;
const stackTokens = { childrenGap: 20 };
const ibanRegex = RegExp(/^([A-Z]{2}[ '+'\\'+'-]?[0-9]{2})(?=(?:[ '+'\\'+'-]?[A-Z0-9]){9,30}$)((?:[ '+'\\'+'-]?[A-Z0-9]{3,5}){2,7})([ '+'\\'+'-]?[A-Z0-9]{1,3})?$/);

const Payment = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [country, setCountry] = useState('ES');
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState('');
  const [account, setAccount] = useState('');
  const [isError, setIsError] = useState({country: '', bank: '', account: ''});

  const user = {};
  const { subscriptionId } = useParams();

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [reference, setReference] = useState(`IRONIA${today.valueOf().toString()}`);

  const countryOptions = [
    { key: 'ES', text: 'España' },
    { key: 'PT', text: 'Portugal' },
  ];

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${proxy}/Banks?code=${code}&clientId=default`, {
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
                const banksList = body.data.map(function(bank) { return {key: bank.bankId, text: bank.name, country: bank.country} });
                setBanks(banksList);
              });
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [proxy, code]);

  const changeCountry = (event, option) => {
    setCountry(option.key);
    const countryError = (option.key === null || option.key === "")
        ? 'Debe seleccionar un país'
        : '';
    setIsError(prevIsError => ({
      ...prevIsError,
      country: countryError
    }));
    if (bank !== '' && banks.find(function(bank) { return bank.country === option.key})) {
      setBank("");
    }
    validateForm('country', option.key, countryError);
  };

  const changeBank = (value, option) => {
    setBank(option.key);
    const bankError = (option.key === null || option.key === "")
        ? 'Debe seleccionar un banco'
        : '';
    setIsError(prevIsError => ({
      ...prevIsError,
      bank: bankError
    }));
    validateForm('bank', option.key, bankError);
  };

  const changeAccount = (event) => {
    const value = event.target.value;
    setAccount(value);
    const accountError =(value === null || value === "")
      ? 'El IBAN es obligatorio'
      : (value.length === 24 && ibanRegex.test(value) ? '' : 'El formato del IBAN no es válido' );
    setIsError(prevIsError => ({
      ...prevIsError,
      account: accountError
    }));
    validateForm('account', value, accountError);
  };

  const validateForm = (key, value, error) => {
    var invalidatedFields = Object.keys(isError).filter(function(field) {
      var fieldValue = eval(field);
      var fieldError = isError[field];
      if (key === field) {
        fieldValue = value;
        fieldError = error;
      }
      return fieldValue === '' || fieldError !== ''
    });
    if (invalidatedFields.length === 0) {
      sendPaymentToInespay(key, value);
    }
  };

  const sendPaymentToInespay = (key, value) => {
    fetch(`${proxy}/Payment?code=${code}&clientId=default`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: JSON.stringify({
        UserId: user.id,
        Subject: user.subscription.Name,
        Amount: user.subscription.Price,
        Reference: reference,
        Frequency: user.subscription.Period === 'month' ? 'Monthly' : 'Annual',
        CountryBank: key === 'country' ? value : country,
        Bank: key === 'bank' ? value : bank,
        Account: key === 'account' ? value : account,
        StartDate: Moment(today).format('YYYY/MM/DD'),
        EndDate: Moment(tomorrow).format('YYYY/MM/DD'),
        Status: 1
      })
    })
    .then((result) => {
        if (result.ok) {
          setIsLoaded(true);
          result.json()
            .then((body) => {
              fetch(`${proxy}/Inespay?code=${code}&clientId=default`, {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                },
                body: JSON.stringify({
                  Subject: user.subscription.Name,
                  Amount: (user.subscription.Price*100).toString(),
                  Reference: reference,
                  Frequency: user.subscription.Period === 'month' ? 'Monthly' : 'Annual',
                  Account: key === 'account' ? value : account,
                  StartDate: Moment(today).format('YYYY-MM-DD'),
                  EndDate: Moment(tomorrow).format('YYYY-MM-DD')
                })
              })
              .then(
                (result) => {
                  if (result.ok) {
                    setIsLoaded(true);
                    result.json()
                      .then((body) => {
                        const inespay_result = JSON.parse(body.Result);
                        if (inespay_result.status === '200') {
                          // hay que guardar los datos recibidos
                          // url
                          // idInespay
                          // inDebt
                          // status
                          // description
                          window.location.href = inespay_result.url;
                        } else {
                          setIsLoaded(true);
                          setError(inespay_result.description);
                        }
                      });
                  }
                },
                (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
              );
            });
        }
    });
  };

  return (
    <DocumentTitle title='IronIA - Pago'>
      <>
        <div className="ms-Grid-row tight">
          <h2>Detalles de pago</h2>
          <p className="description">Este método de pago conecta con su banca online mediante las mismas claves de acceso:</p>
          <Separator className="separator" />
        </div>
        <div className="ms-Grid-row tight">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-lg5">
              <div className="blue payment-data">
                <dl>
                  <dt>Beneficiario</dt>
                  <dd>
                    <ul>
                      <li>Ironia</li>
                      <li>Simplicitas Capital, SL | B87806337</li>
                      <li>Maria de Molina 40, Planta 7 - Madrid 28006</li>
                    </ul>
                  </dd>
                  <dt>Referencia</dt>
                  <dd>Orden Ironia - {reference}</dd>
                  <dt>Importe</dt>
                  <dd>{user.subscription.Price} €</dd>
                </dl>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-lg7">
              <div className="">
                <form action='/payment' className="payment">
                  <Stack tokens={stackTokens}>
                    <Stack.Item grow>
                      <Dropdown
                        label="País"
                        required
                        placeholder="Selecciona un país"
                        name="country"
                        value={country}
                        options={countryOptions}
                        onChange={changeCountry}
                        dropdownWidth={344}
                        errorMessage={isError.country.length > 0 ? isError.country : undefined}
                      />
                    </Stack.Item>
                    <Stack.Item grow>
                      <Dropdown
                        label="Entidad bancaria"
                        required
                        placeholder="Selecciona un entidad bancaria"
                        name="bank"
                        value={bank}
                        options={banks.filter(function(bank) { return bank.country === country; })}
                        onChange={changeBank}
                        dropdownWidth={344}
                        errorMessage={isError.bank.length > 0 ? isError.bank : undefined}
                      />
                    </Stack.Item>
                    <Stack.Item grow>
                      <TextField
                        label="IBAN"
                        required
                        placeholder="Ingresa el IBAN de tu cuenta bancaria"
                        name="iban"
                        value={account}
                        onChange={changeAccount}
                        errorMessage={isError.account.length > 0 ? isError.account : undefined}
                      />
                    </Stack.Item>
                  </Stack>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </DocumentTitle>
  );
};

export default Payment;
