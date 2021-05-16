import React from 'react'
import { initializeIcons } from '@uifabric/icons';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { RouteComponentProps } from 'react-router';

const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

type SomeComponentProps = RouteComponentProps;

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Resumen de cartera',
        url: '/',
        key: 'portfolio',
        icon: 'GoToDashboard'
      },
      {
        name: 'Operaciones realizadas',
        url: '/',
        key: 'operations-performed',
        icon: 'BulletedList'
      },
      {
        name: 'Órdenes en curso',
        url: '/',
        key: 'orders-in-progress',
        icon: 'News'
      },
      {
        name: 'Información fiscal',
        url: '/',
        key: 'fiscal-information',
        icon: 'Stack'
      },
    ]
  }
];

const PortfolioMenu: React.FC<SomeComponentProps> = ({history}) => {
  initializeIcons();


  function _onLinkClick(event?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    if (event) {
      event.nativeEvent.preventDefault();
    }
    if (item && item.key) {
      history.push(item.url);
    }
  }

  return (
    <Nav
      onLinkClick={_onLinkClick}
      //selectedKey={history[history.length - 1] || 'portfolio'}
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

export default PortfolioMenu;
