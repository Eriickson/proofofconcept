import React, { useState } from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import { DefaultButton, Stack } from "office-ui-fabric-react";
import { registerIcons } from "@uifabric/styling";
import { CommandBar, ICommandBarItemProps } from "office-ui-fabric-react/lib/CommandBar";
import { IButtonProps } from "office-ui-fabric-react/lib/Button";
import { IIconProps } from "@fluentui/react";
import { initializeIcons } from "@uifabric/icons";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TeachingBubble } from "office-ui-fabric-react/lib/TeachingBubble";
import { useHistory } from "react-router-dom";
import Toggle from "./Toggle";
import PersonStatus from "./PersonStatus";
import "./Header.sass";
import logo from "../images/logo.svg";
import logo_dark from "../images/logo_dark.svg";
import { ReactComponent as SpacerIcon } from "../images/spacer.svg";
import { MainSearch } from "./Buscadores/main/MainSearch";

const _overflowItems: ICommandBarItemProps[] = [];
const overflowProps: IButtonProps = { ariaLabel: "Más acciones" };

registerIcons({
  icons: {
    ironiaSearch: <i className="ironia-icon search" />,
  },
});

const filterIcon: IIconProps = { iconName: "ironiaSearch" };

const Header = (props: any) => {
  let history = useHistory();
  const bubbleVisible = window.localStorage.getItem("bubbleVisible");
  const [_items, setItems] = useState([{ key: "0" }]);
  const [state, setState] = useState({
    teachingBubbleVisible: bubbleVisible !== null ? bubbleVisible === "true" : true,
  });

  window.localStorage.setItem("bubbleVisible", state.teachingBubbleVisible.toString());
  initializeIcons();

  const handleHomeButtonClick = () => {
    // FIXME: marcar la entrada del menú correpondiente
    history.push("/");
  };

  const handleCommandClick = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    [...document.getElementById("main-menu").getElementsByClassName("is-selected")].forEach(
      (element) => {
        element.classList.remove("is-selected");
      },
    );
    // @ts-ignore
    [...document.getElementsByClassName("ms-ContextualMenu")].forEach((menuElement) => {
      [...menuElement.getElementsByClassName("is-selected")].forEach((element) => {
        element.classList.remove("is-selected");
      });
    });
    if (
      event.currentTarget.parentElement.parentElement.classList.contains("ms-ContextualMenu-item")
    ) {
      event.currentTarget.parentElement.parentElement.classList.add("is-selected");
    } else {
      event.currentTarget.classList.add("is-selected");
    }
    const url = new URL(event.currentTarget.href);
    history.push(url.pathname);
  };

  const handleStatusChange = (status: any) => {
    let teachingBubbleVisible = status.teachingBubbleVisible
      ? !status.teachingBubbleVisible
      : !state.teachingBubbleVisible;
    setState({
      teachingBubbleVisible: teachingBubbleVisible,
    });
    window.localStorage.setItem("bubbleVisible", teachingBubbleVisible.toString());
  };

  const handleMenuButtonClick = (event: any) => {
    event.preventDefault();
    props.menuRef.current.showMenu();
  };

  return (
    <div id="header">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 ms-xxl3">
          <Stack horizontal disableShrink>
            <DefaultButton title="Mostrar menú" id="show-menu" onClick={handleMenuButtonClick}>
              <i className="ironia-icon functions" />
            </DefaultButton>
            <SpacerIcon className="spacer" />
            <DefaultButton
              className="home-link"
              title="Página principal"
              onClick={handleHomeButtonClick}
            >
              <Image
                src={props.theme.palette.name === "dark" ? logo_dark : logo}
                alt="IronIA logotipo"
              />
            </DefaultButton>
            {window.innerWidth < 1024 && (
              <>
                <DefaultButton title="Notificaciones">
                  <i className="ironia-icon notifications" />
                </DefaultButton>
                <DefaultButton title="Carrito">
                  <i className="ironia-icon shopping-cart" />
                </DefaultButton>
              </>
            )}
          </Stack>
        </div>
        {window.innerWidth > 1023 && <MainSearch />}
        {window.innerWidth > 1023 && (
          <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 ms-xxl4">
            <Stack horizontal disableShrink>
              <Toggle
                theme={props.theme}
                toggleTheme={props.toggleTheme}
                identificator="toggle-large"
                className="hiddenMdDown"
              />
              {window.innerWidth > 1023 && state.teachingBubbleVisible && (
                <TeachingBubble
                  target="#toggle-large"
                  hasCloseButton={true}
                  onDismiss={handleStatusChange}
                  headline="Esta es la primera vez que accedes a IronIA"
                >
                  Puedes cambiar el tema si lo deseas
                </TeachingBubble>
              )}
              <SpacerIcon className="spacer" />
              <DefaultButton title="Notificaciones">
                <i className="ironia-icon notifications" />
              </DefaultButton>
              <PersonStatus
                // @ts-ignore
                theme={props.theme}
              />
              <DefaultButton title="Carrito">
                <i className="ironia-icon shopping-cart" />
              </DefaultButton>
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
