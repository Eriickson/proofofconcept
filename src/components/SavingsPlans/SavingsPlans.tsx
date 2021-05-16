import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { DefaultButton, IconButton, Slider } from 'office-ui-fabric-react';
import { Checkbox, Stack, Modal, Text, IIconProps } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import ReactPlayer from "react-player";
import DocumentTitle from 'react-document-title';
import UserContext from '../../App';
import styled from 'styled-components';
import './SavingsPlans.sass';
import { registerIcons } from '@uifabric/styling';
import { ReactComponent as WellcomeImage } from '../../images/wellcome.svg';

registerIcons({
  icons: {
    'ironiaCancel': <i className="ironia-icon cross" />,
  }
});
const cancelIcon: IIconProps = { iconName: 'ironiaCancel' };

const SavingsPlans = () => {
  const proxy = process.env.REACT_APP_PROXY_URL;
  const code = process.env.REACT_APP_PROXY_CODE;
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [savingsPlan, setSavingsPlan] = useState({
    Id: 0,
    WhatIsIronia: false,
    StartTrading: false,
    ConvenienceTest: false,
    SuitabilityTest: false,
    InitialContribution: 0,
    PeriodicContribution: 0,
    PeriodicContributionPeriod: '',
    InvestForFree: false,
    TransferPortfolio: false,
    NormalInvestment: false,
    ManagementInvestment: false,
    ManagerId: '',
    AdvisedtInvestment: false,
    AdviserId: ''
  });
  const [isWellcomeOpen, { setTrue: showWellcome, setFalse: hideWellcome }] = useBoolean(true);
  const [isVideoOpen, { setTrue: showVideo, setFalse: hideVideo }] = useBoolean(false);
  const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);
  const valueFormat = (value: number) => `${value}%`;
  // @ts-ignore
  const user = useContext(UserContext);

  const StyledSavingsPlan = styled.div`
    p.description {
      width: 50%;
    }

    > .separator {
      margin-top: 32px;
      margin-bottom: 28px;
    }

    .shadow {
      padding: 32px;
      
      h3 {
        font-size: 24px;
        line-height: 32px;
        font-weight: 800;
      }

      .ms-Slider {
        margin-bottom: 38px;

        .ms-Slider-container {
          position: relative;

          .ms-Slider-slideBox {
            position: absolute;
            right: 0;
            width: calc(100% - 70px);

            .ms-Slider-thumb {
              width: 16px;
              height: 8px;
              background: #CC214F;
              border: 0;
              top: 2px;
              margin-left: 10px;
            }

            .ms-Slider-inactive {
              height: 12px;
              background: #FAE9ED;
              border-radius: 100;
            }
          }

          .ms-Label {
            position: absolute;
            color: #BFC6C7;
            font-weight: 800;
            font-size: 18px;
            line-height: 24px;
          }
        }
      }

      h4 {
        font-size: 18px;
        line-height: 24px;
        font-weight: 800;
        margin-top: 0;
        margin-bottom: 8px;
      }

      .grey {
        padding: 24px;
        border-radius: 16px;
      }

      .ironia-icon {
        position: absolute;
        right: 8px;
        width: 32px;
        height: 32px;
        border-radius: 100px;
        &.check {
          background: #BEFBD6;
          color: #1BB3AD;
        }
        &:after {
          font-size: 14px;
          line-height: 32px;
        }
      }

      button {
        padding: 14px 38px;
        height: fit-content;
        margin-bottom: 16px;
        border-color: transparent;
        &.full-width {
          width: 100%;
        }
        &.is-disabled {
          background: #DFE3E3;
          box-shadow: none;
          color: #93AEB9;
          &.pending {
            background: #CC214F;
            color: white;
            opacity: 0.3;
          }
        }
        &.iconned {
          padding-right: 65px;
          .ironia-icon {
            font-weight: 100;
            right: 18px;
            &:after  {
              font-size: 14px;
              line-height: 34px;
            }
          }
        }
        span {
          font-weight: 600;
        }
      }

      p {
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;
        margin-top: 8px;
        margin-bottom: 24px;
      }

      .separator {
        margin-top: 24px;
        margin-bottom: 24px;
      }

      .ms-Checkbox,
      .ms-ChoiceField-field {
        display: inline-block;
        margin-right: 16px;
        margin-top: 3px;
      }

      .ms-Checkbox {
        .ms-Checkbox-checkbox {
          border-radius: 4px;
          width: 20px;
          height: 20px;
          box-sizing: border-box;
          border: 1.25px solid #93AEB9;
          background: #F3F7F9;
        }

        &.is-checked {
          .ms-Checkbox-checkbox {
            background: #CC214F;
            border: 1.25px solid #B31540;
            .ms-Checkbox-checkmark {
              font-weight: 700;
            }
          }
        }
      }

      .ms-ChoiceField-field {
        &:before {
          border: 2px solid #93AEB9;
          background: #FFFFFF;
          opacity: 0.5;
        }

        &.is-checked {
          &:after {
            background: #CC214F;
            width: 14px;
            height: 14px;
            border: 0;
            left: 3px;
            top: 3px;
          }
        }
      }

      .ms-Label {
        color: #556769;
      }

      .checkbox-data {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 42px);

        button.full-width {
          width: calc(100% - 45px);
        }
      }

      .ms-TextField-fieldGroup {
        border-radius: 0;
      }

      .step {
        &.disabled {
          opacity: 0.5;
        }
      }
    }
  `;

  const BlockButton = styled.div`
    background: #CC214F;
    border-radius: 16px;
    padding: 24px 65px 24px 24px;
    margin: 14px 0;
    position: relative;

    h4 {
      color: #FFFFFF;
    }

    p {
      color: #FFFFFF;
      margin: 8px 0 !important;
      font-weight: 400 !important;
    }

    button {
      position: absolute;
      right: 0;
      height: 100% !important;
      top: 0;
      background: #B31540;
      width: 40px;
      padding: 0 !important;
      border-radius: 0 12px 12px 0;
      color: #FFFFFF;

      .ironia-icon:after {
        font-size: 24px !important;
        font-weight: 100;
        margin-left: 8px;
      }
    }
  `;

  const periodOptions: IDropdownOption[] = [
    { key: 'month', text: 'Mes' },
    { key: 'trimester', text: 'Trimestre' },
    { key: 'semester', text: 'Semestre' },
    { key: 'year', text: 'Año' },
  ];

  const investOptions: IChoiceGroupOption[] = [
    {
      key: 'free',
      text: '',
      onRenderField: (props, render) => {
        return (
          <div>
            {render!(props)}
            <div className="checkbox-data">
              <h4>Invertir por libre</h4>
              <p>Podrás decidir sobre que activo invertir y cuánta cantidad en todo momento.</p>
            </div>
            <Separator className="separator" />
          </div>
        );
      },
    },
    {
      key: 'transfer',
      text: '',
      onRenderField: (props, render) => {
        return (
          <div>
            {render!(props)}
            <div className="checkbox-data">
              <h4>Traspasar cartera</h4>
              <p>Si tienes dinero invertido en fondos de inversión en otras gestoras, siempre puedes
                traspasar aquí tus inversiones sin ningún coste adicional.</p>
            </div>
          </div>
        );
      },
    },
  ];

  const advisedOptions: IChoiceGroupOption[] = [
    {
      key: 'free',
      text: '',
      onRenderField: (props, render) => {
        return (
          <div>
            {render!(props)}
            <div className="checkbox-data">
              <h4>Yo me lo gestiono todo.</h4>
              <p>Podrás decidir sobre que activo invertir y cuánta cantidad en todo momento.</p>
            </div>
            <Separator className="separator" />
          </div>
        );
      },
    },
    {
      key: 'manager',
      text: '',
      onRenderField: (props, render) => {
        return (
          <div>
            {render!(props)}
            <div className="checkbox-data">
              <h4>Quiero que me lo gestionen todo.</h4>
              <p>A través de nuestras gestoras de confianza podrás despreocuparte del día a día de tu
                inversión y dejar las decisiones importantes en profesionales de confianza.</p>
              <DefaultButton className="button primary-button full-width" disabled={true} text="Seleccionar gestora" />
            </div>
            <Separator className="separator" />
          </div>
        );
      },
    },
    {
      key: 'advider',
      text: '',
      onRenderField: (props, render) => {
        return (
          <div>
            {render!(props)}
            <div className="checkbox-data">
              <h4>Traspasar cartera</h4>
              <p>Si tienes dinero invertido en fondos de inversión en otras gestoras, siempre puedes
                traspasar aquí tus inversiones sin ningún coste adicional.</p>
              <DefaultButton className="button primary-button full-width" disabled={true} text="Seleccionar asesor" />
            </div>
          </div>
        );
      },
    },
  ];

  //const user = useSelector(state => state.user);

  const handleEndedVideo = () => {
    hideVideo();
    setSavingsPlan(prevState => ({
      ...prevState,
      WhatIsIronia: true
    }));
    /*setIsLoaded(false);
    fetch(`${proxy}/SavingsPlan?code=${code}&clientId=default&savingsPlan=${savingsPlan.Id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
      },
      body: JSON.stringify({
        WhatIsIronia: true
      })
    })
    .then(
      (result) => {
        if (result.ok) {
          setIsLoaded(true);
          result.json()
            .then((body) => {
              setSavingsPlan(prevState => ({
                ...prevState,
                WhatIsIronia: true
              }));
            });
        }
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )*/
  };

  useEffect(() => {
    //setIsLoaded(false);
    setIsLoaded(true);
    /*
    fetch(`${proxy}/SavingsPlan?code=${code}&clientId=default&userId=${user.Id}`, {
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
                setSavingsPlan(body);
              });
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )*/
  }, [proxy, code]);

  if (error) {
    return (<div>Error: {// @ts-ignore
      error.message}</div>)
  }

  if (!isLoaded || savingsPlan === undefined) {
    return (<div>Cargando ...</div>)
  }

  return (
        <DocumentTitle title='IronIA - Plan de ahorro'>
          <StyledSavingsPlan className="ms-Grid-row savings-plans">
            <h2>Configura tu plan de ahorro</h2>
            <p className="description">Configura tu perfil, decide cuanto quieres invertir, cuándo quieres
            desembolsar tu dinero y cómo quieres hacerlo.</p>
            <Separator className="separator" />
            <div className="ms-Grid-col ms-sm4">
              <div className="shadow">
                <h3>Da tus primeros pasos</h3>
                <Slider
                  max={100}
                  value={0}
                  valueFormat={valueFormat}
                  disabled={true}
                />
                <div className="grey">
                  <h4>¿Qué es IronIA?</h4>
                  <p>IronIA es "libertad para invetir". A través de nuestra plataforma podrás realizar
                    inversiones sin mínimos ni comisiones. Traspasar tu cartera y optimizar la rentabilidad
                    de tus inversiones sía a día.
                  </p>
                  {!savingsPlan.WhatIsIronia && (
                    <DefaultButton className="button primary-button iconned" onClick={showVideo}>
                      <Text>Conocer como funciona</Text>
                      <i className="ironia-icon play"></i>
                    </DefaultButton>
                  )}
                  {savingsPlan.WhatIsIronia && (
                    <DefaultButton className="button primary-button full-width" disabled>
                      <Text>¡Ya has visto el vídeo!</Text>
                      <i className="ironia-icon check"></i>
                    </DefaultButton>
                  )}
                  <Modal
                    isOpen={isVideoOpen}
                    onDismiss={hideVideo}
                    isBlocking={false}
                    containerClassName="video-container"
                  >
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=epXkDfIvEyc&widgetid=2&origin=${window.location.href}`}
                      playing={true}
                      controls={true}
                      // @ts-ignore
                      onEnded={handleEndedVideo}
                    />
                  </Modal>
                </div>
                <Separator className="separator" />
                <div className="step">
                  <h4>¿Quieres empezar a operar?</h4>
                  <p>Suscríbete ya en IronIA para descubrir todas las ventajas de llevar tus finanzas a otro
                    nivel</p>
                  {!savingsPlan.StartTrading && (
                    <DefaultButton className="button primary-button" text="Suscribirme a IronIA" />
                  )}
                  {savingsPlan.StartTrading && (
                    <DefaultButton className="button primary-button full-width" disabled>
                      <Text>¡Ya estás suscrito!</Text>
                      <i className="ironia-icon check"></i>
                    </DefaultButton>
                  )}
                </div>
                <Separator className="separator" />
                <div className="step">
                  <h4>Datos fiscales obligatorios</h4>
                  <p>Antes de poder operar debes rellenar un breve test para confirmar ante la CNMV que
                    sabes qué estás haciendo. Recuerda que debes tener tu DNI y al menos una nómina a
                    mano.</p>
                  {!savingsPlan.ConvenienceTest && (
                    <DefaultButton className="button primary-button pending" disabled={true}>Completar test de conveniencia</DefaultButton>
                  )}
                  {savingsPlan.ConvenienceTest && (
                    <DefaultButton className="button primary-button full-width" disabled>
                      <Text>Test realizado correctamente</Text>
                      <i className="ironia-icon check"></i>
                    </DefaultButton>
                  )}
                </div>
                <Separator className="separator" />
                <div className="step disabled">
                  <h4>Datos idoneidad de la inversión</h4>
                  <p>Estos datos sólo los deberás rellenar si decides invertir a través de un gestor o un
                  asesor. En ellos presentarás que tipo de inversión deseas realizar.</p>
                  <DefaultButton className="button primary-button" disabled={true}>Completar test de idoneidad</DefaultButton>
                </div>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm4">
              <div className="shadow">
                <h3>Cuánto y cuándo invertir</h3>
                <Slider
                  max={100}
                  value={0}
                  valueFormat={valueFormat}
                  disabled={true}
                />
                <div className="grey">
                  <h4>Elige tu forma de invertir</h4>
                  <p>Puedes elegir un plan de inversión periódica (mes a mes), un desembolso inicial o
                    si tu intención y tu conocimiento sobre el sector lo permiten, si quieres ir por
                    libre.</p>
                </div>
                <Separator className="separator" />
                <div className="step disabled">
                  <Checkbox disabled />
                  <div className="checkbox-data">
                    <h4>Aportación inicial</h4>
                    <p>Si seleccionas esta opción deberás indicar qué importe quieres invertir inicialmente.</p>
                    <TextField
                      label="Importe (euros)"
                      placeholder="Indicas tu importe a invertir inicialmente"
                      disabled
                    />
                  </div>
                </div>
                <Separator className="separator" />
                <div className="step disabled">
                  <Checkbox disabled />
                  <div className="checkbox-data">
                    <h4>Aportación periódica</h4>
                    <p>Si seleccionas esta opción deberás indicar qué importe quieres invertir y su
                      periodicidad.</p>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm12 ms-lg6">
                        <TextField
                          label="Importe (euros)"
                          placeholder="Indica el importe"
                          disabled
                        />
                      </div>
                      <div className="ms-Grid-col ms-sm12 ms-lg6">
                        <Dropdown
                          placeholder="Selecciona una opción"
                          label="Periodicidad"
                          options={periodOptions}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator className="separator" />
                <div className="step disabled">
                  <ChoiceGroup options={investOptions} disabled />
                </div>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm4">
              <div className="shadow">
                <h3>Cómo quieres invertir</h3>
                <Slider
                  max={100}
                  value={0}
                  valueFormat={valueFormat}
                  disabled={true}
                />
                <div className="grey">
                  <h4>Elige tu cartera de inversiones</h4>
                  <p>Puedes elegir diferentes opciones para conformar tu cartera de inversión. Desde que
                    te lleve todo una gestora de confianza, que expertos en el sector te asesoren, y hasta si
                    quieres ser tu quién decida qué, cuánto y cómo invertir.</p>
                </div>
                <Separator className="separator" />
                <div className="step disabled">
                  <ChoiceGroup options={advisedOptions} disabled />
                </div>
                <div className="step">
                  <Stack>
                    <BlockButton>
                      <h4>Buscador de fondos</h4>
                      <p>Busca las mejores oportunidades y observa la trayectoria de su rentabilidad.</p>
                      <DefaultButton><i className="ironia-icon keyboard-arrow-right" /></DefaultButton>
                    </BlockButton>
                    <BlockButton>
                      <h4>Buscador por categorías</h4>
                      <p>¿Te interesa una categoría de inversión determinada? Empieza a navegar y elige los fondos que
                        más te encajen.</p>
                      <DefaultButton><i className="ironia-icon keyboard-arrow-right" /></DefaultButton>
                    </BlockButton>
                    <BlockButton>
                      <h4>Buscador de empresas</h4>
                      <p>Si ya sabes en que empresa te gustaría invertir, te lo ponemos fácil. Encuentra la empresa y
                        determina la inversión.</p>
                      <DefaultButton><i className="ironia-icon keyboard-arrow-right" /></DefaultButton>
                    </BlockButton>
                    <BlockButton>
                      <h4>Ranking de carteras</h4>
                      <p>Compara las inversiones del resto de personas y copia aquellas inversiones que más te
                        concenzan.</p>
                      <DefaultButton><i className="ironia-icon keyboard-arrow-right" /></DefaultButton>
                    </BlockButton>
                  </Stack>
                </div>
              </div>
            </div>
            <Modal
              isOpen={isWellcomeOpen}
              onDismiss={hideWellcome}
              isBlocking={false}
              containerClassName="wellcome-container"
            >
              <IconButton
                iconProps={cancelIcon}
                ariaLabel="Close wellcome modal"
                onClick={hideWellcome}
                className="close-button"
              />
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-lg6">
                  <WellcomeImage />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg6">
                  <div className="wellcome-text">
                    <h2>¡Bienvenido a Ironia!</h2>
                    <p className="description">Descubre todas las ventajas de tener libertad para invertir.</p>
                    <Separator className="separator" />
                    <p>A continuación te guiaremos dentro de la plataforma con pequeños tips y consejos para que puedas
                      dar de alta tu plan, crear tu cartera de inversiones e incluso buscar y configurar cómo quieres
                      gestionar tus planes de ahorro.</p>
                      <DefaultButton className="button primary-button" text="Comenzar" onClick={hideWellcome} />
                  </div>
                </div>
              </div>
            </Modal>
          </StyledSavingsPlan>
        </DocumentTitle>
      );
    }


export default SavingsPlans;
