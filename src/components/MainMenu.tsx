import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { registerIcons } from '@uifabric/styling';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Toggle } from '@fluentui/react/lib/Toggle';
import { IIconProps, DefaultButton, Stack, Text, Image } from 'office-ui-fabric-react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Separator } from '@fluentui/react/lib/Separator';
import PersonStatus from './PersonStatus';
import logo from '../images/logo.svg';
import logo_dark from '../images/logo_dark.svg';
import { ReactComponent as FacebookIcon } from '../images/facebook.svg';
import { ReactComponent as YoutubeIcon } from '../images/youtube.svg';
import { ReactComponent as TwitterIcon } from '../images/twitter.svg';
import { ReactComponent as LinkedinIcon } from '../images/linkedin.svg';

type SomeComponentProps = RouteComponentProps;

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
        key: 'saving-planes',
        name: 'Planes de ahorro',
        url: ''
      },
      {
        key: 'fund-finder',
        name: 'Buscador de fondos',
        url: ''
      },
      {
        key: 'my-portfolio',
        name: 'Mi cartera',
        url: '',
        disabled: true
      },
      {
        key: 'portfolio-ranking',
        name: 'Ranking de carteras',
        url: '',
        disabled: true
      },
      {
        key: 'purchase-transfer',
        name: 'Compra / Traspasa',
        url: '',
        disabled: true
      },
    ],
  },
];

registerIcons({
 icons: {
   'ironiaSearch': <i className="ironia-icon search" />,
  }
});

const filterIcon: IIconProps = { iconName: 'ironiaSearch' }

const MainMenu = (theme: any, ref: any) => {
  let history = useHistory();

  const [state, setState] = useState({
    menuIsOpened: false
  });

  useImperativeHandle(ref, () => ({
    showMenu () {
      setState({ menuIsOpened: true });
    }
  }));

  const dismissMenu = (event: any) => {
    event.preventDefault();
    setState(prevState => ({
        ...prevState,
        menuIsOpened: false
      })
    );
  };



  return (
    <Panel
      isOpen={state.menuIsOpened}
      onDismiss={dismissMenu}
      type={PanelType.smallFluid}
      hasCloseButton={false}
      closeButtonAriaLabel="Cerrar"

    >
      <Stack horizontal>
        <DefaultButton className="icon-button" onClick={dismissMenu}>
          <i className="ironia-icon cross" />
        </DefaultButton>
        <Separator vertical className="separator vertical" />
        <Image
          src={theme.theme.palette.name === 'light'  ? logo_dark : logo }
          alt="IronIA logotipo"
        />
      </Stack>
      {window.innerWidth < 641 && (
        <SearchBox placeholder="Buscar..." iconProps={filterIcon} onSearch={newValue => console.log('value is ' + newValue)} />
      )}
      <Nav ariaLabel="Menu" styles={navStyles} groups={navLinkGroups} />
      <Stack className="hiddenSm">
        <Text>Personaliza tu vista de contenidos:</Text>
        <Toggle defaultChecked onText="LIGHT MODE" offText="DARK MODE" />
      </Stack>
      <Stack>
        <h4>¿Quieres operar en Ironia Store?</h4>
        <Text className="fs16">Suscríbete ya en Ironia para descibrir todas las ventajas de llevar tus finanzas a otro nivel</Text>
        <DefaultButton className="primary-button">¡Susbríbete!</DefaultButton>
      </Stack>
      <Separator className="separator" />
      {window.innerWidth < 641 && (
        <>
          <PersonStatus
            // @ts-ignore
            theme={theme.theme} />
          <Separator className="separator" />
        </>
      )}
      <Text className="fs12">SÍGUENOS EN:</Text>
      <Stack className="social-networks">
        <DefaultButton><FacebookIcon /></DefaultButton>
        <DefaultButton><YoutubeIcon /></DefaultButton>
        <DefaultButton><TwitterIcon /></DefaultButton>
        <DefaultButton><LinkedinIcon /></DefaultButton>
      </Stack>
    </Panel>
  );
};

export default forwardRef(MainMenu);
