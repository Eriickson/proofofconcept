import * as React from 'react'
import { Callout, DirectionalHint } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react';
import { registerIcons } from '@uifabric/styling';
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { useHistory , RouteComponentProps} from "react-router-dom";
import styled from "styled-components";
import Auth from '../Auth/Auth';

type Props = {
  theme: any
}

const PersonStatus : React.FC<Props> = ({theme}) => {
  registerIcons({
    icons: {
      'ironiaDocumentation': <i className="ironia-icon documentation" />,
      'profile': <i className="ironia-icon profile" />,
      'finishedOperations': <i className="ironia-icon finished-operations-2" />,
      'lockOpen': <i className="ironia-icon lock-open" />,
      'information': <i className="ironia-icon information" />,
      'logout': <i className="ironia-icon logout" />,
    }
  });

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
  let history = useHistory();

  const PersonComponent = styled.div`
    box-sizing: border-box;
    border-radius: 32px;
    width: 200px;
    height: 48px;
    margin-top: 8px !important;
    border: ${props => // @ts-ignore
      '1px solid ' + `${theme.palette.tertiary}`};

    > * {
      display: inline-flex;
      vertical-align: middle;
      margin: 7px 0 7px 7px;
    }

    button {
      position: relative;
      z-index: 2000;
      box-sizing: border-box;
      line-height: 26px;
      height: 32px;
      min-width: unset !important;
      min-height: unset !important;
      margin-left: 0 !important;
      border-radius: 16px;
      border: ${props => // @ts-ignore
        '1px solid ' + `${theme.palette.tertiary}`} !important;
      cursor: pointer;
      padding: 0 7.5px;
      i.ironia-icon:after {
        font-size: 17px;
      }
    }

    .ms-Persona {
      .ms-Persona-coin {
        .ms-Persona-imageArea {
          .ms-Persona-initials {
            background: #D9E6FA;
            span {
              color: ${props => // @ts-ignore
                `${theme.palette.darkBorder}`};
            }
          }
        }
      }
      .ms-Persona-details {
        .ms-Persona-primaryText {
          .ms-TooltipHost {
            color: ${props => // @ts-ignore
              `${theme.palette.neutralPrimary} !important`};
          }
        }
        .ms-Persona-secondaryText {
          .ms-TooltipHost {
            color: ${props => // @ts-ignore
              `${theme.palette.darkBorder} !important`}
          }
        }
      }
    }
  `;
  
  const navStyles: Partial<INavStyles> = {
    root: {
      boxSizing: 'border-box',
      border: '1px solid #eee',
      overflowY: 'auto',
    },
    link: {
      whiteSpace: 'normal',
      lineHeight: 'inherit',
    },
  };

  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          key: 'documentation',
          icon: 'ironiaDocumentation',
          name: 'Documentación',
          url: ''
        },
        {
          key: 'Ownership of the contract',
          iconProps: { iconName: 'profile' },
          name: 'Titularidad del contrato',
          url: ''
        },
        {
          key: 'Contracted plans',
          iconProps: { iconName: 'finishedOperations' },
          name: 'Planes contratados',
          url: ''
        },
        {
          key: 'Change password',
          iconProps: { iconName: 'lockOpen' },
          name: 'Cambiar contraseña',
          url: '',
          onClick: (event: any) => window.location.href = process.env.REACT_APP_SERVER_HOST + '/password/change'          
        },
        {
          key: 'Corporate information',
          iconProps: { iconName: 'information' },
          name: 'Información corporativa',
          url: ''
        },
        {
          temkey: 'Close session',
          iconProps: { iconName: 'logout' },
          name: 'Cerrar sesión',
          url: '',
          onClick: (event: any) => { Auth.logout(); window.location.href = process.env.REACT_APP_SERVER_HOST+'/logout' }
        },
      ],
    },
  ];

  const handleCommandClick = (event: any) => {
    const url = new URL(event.currentTarget.href);
    history.push(url.href);
  };

  return (
    <PersonComponent className='persona-component'>
      <Persona
        imageInitials = "KI"
        text = "Kanoa Igarashi"
        showSecondaryText={true}
        secondaryText = "3723682372"
        size = {PersonaSize.size32}
        presence = {PersonaPresence.online}
        //className="warning"
      />
      <DefaultButton id={buttonId} onClick={toggleIsCalloutVisible}>
        <i className="ironia-icon keyboard-arrow-down"/>
      </DefaultButton>
      {isCalloutVisible ? (
        <Callout
          className="profile-actions"
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="alertdialog"
          target={`#${buttonId}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
          gapSpace={-10}
          calloutWidth={312}
          directionalHint={DirectionalHint.bottomRightEdge}
        >
          <Persona
            imageInitials = "KI"
            text = "Kanoa Igarashi"
            showSecondaryText={true}
            secondaryText="Turbamulta2.0"
            className="big header"
            // @ts-ignore
            size = {PersonaSize.size64}
          />
          <Nav ariaLabel="Nav example with wrapped link text" styles={navStyles} groups={navLinkGroups} />
        </Callout>
      ) : null}
    </PersonComponent>
  );
};

export default PersonStatus;
