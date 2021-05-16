import React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { DefaultButton, Stack, Text, Separator } from 'office-ui-fabric-react';
import { ThemeContext } from './ThemeContext';
import { useHistory } from "react-router-dom";
import logo_dark from '../images/logo_dark.svg';
import logo_cnmv from '../images/cnmv.png';
import logo_diaphanum from '../images/diaphanum.png';
import logo_fintech from '../images/fintech.png';
import styled from "styled-components";

import { ReactComponent as FacebookIcon } from '../images/facebook.svg';
import { ReactComponent as YoutubeIcon } from '../images/youtube.svg';
import { ReactComponent as TwitterIcon } from '../images/twitter.svg';
import { ReactComponent as LinkedinIcon } from '../images/linkedin.svg';

const Footer = () => {
  let history = useHistory();

  const StyledFooter = styled.footer`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 514px;
    box-shadow: 0px 2px 8px rgba(8, 84, 117, 0.08);
    color: #FFFFFF;
    button {
      background: transparent;
      border: 0;
    }
    .footprint {
      width: 374px;
      height: 469px;
      margin: 45px 115px 0;
      padding: 135px 44px 0 64px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      float: right;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        background-image: url(${props => // @ts-ignore
          `${process.env.PUBLIC_URL + '/images/footprint.svg'}`});
      }
      .home-link {
        height: fit-content;
        padding: 0;
        margin-left: -42px;
        img {
          height: 114px;
          margin-bottom: -27px;
        }
      }
    }

    .ms-Grid-row {
      .ms-Grid-col {
        &:last-child {
          padding-top: 76px;
        }
      }
    }

    .slogan {
      font-size: 24px;
      font-weight: 200;
      line-height: 32px;
      opacity: 0.7;
    }

    .separator {
      opacity: 0.2;
      margin-top: 12px;
      margin-bottom: 13px;
    }

    .copyright {
      font-size: 16px;
      font-weight: 100;
      line-height: 22px;
      opacity: 0.4;
    }

    .title {
      font-size: 14px;
      line-height: 20px;
      opacity: 0.5;
      margin-top: 48px;
      margin-bottom: 24px;
      display: block;
    }

    .links {
      font-size: 14px;
      line-height: 20px;
      display: inline-block;
      > * {
        margin-left: 72px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }

    .social-networks {
      display: inline-block;
      button {
        min-width: 0;
        width: 56px;
        height: 32px;
        text-align: center;
        background: rgba(255,255,255,0.1);
        border-radius: 32px;
        margin-left: 16px;
        padding: 0;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }

    .sponsors {
      display: inline-block;
      margin-top: -15px;
      .ms-Image {
        vertical-align: bottom;
        margin-left: 92px;
        display: inline-block;
        &:first-child {
          margin-left: 0;
        }
      }
    }

    @media (max-width: 640px) {
      position: relative;
      height: 850px;
      min-height: unset;
      .footprint {
        height: 300px;
        padding: 33px 30px;
        margin: 0;
        &:before {
          transform: rotate(125deg);
          top: -150px;
          left: -55px;
          height: 470px;
        }
      }

      .ms-Grid-row {
        .ms-Grid-col:last-child {
          padding: 0 32px;
          .title:first-child {
            margin-top: 20px;
          }

          .links {
            > * {
              margin-left: 32px;
              &:first-child {
                margin-left: 0;
              }
            }
          }
        }
      }

      .sponsors {
        .ms-Image {
          padding: 15px 0;
          display: block;
          margin: 0;
        }
      }
    }
  `;

  const handleHomeButtonClick = () => {
    // FIXME: marcar la entrada del menú correpondiente
    history.push("/");
  }

  return (
    <ThemeContext.Consumer>
      {theme => (
        <StyledFooter>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <div className="footprint">
                <DefaultButton className="home-link" title="Página principal" onClick={handleHomeButtonClick}>
                  <Image
                    src={logo_dark}
                    alt="IronIA logotipo"
                  />
                </DefaultButton> 
                <Text className="slogan">Libertad para invertir</Text>
                <Separator className="separator" />
                <Text className="copyright">&copy;{new Date().getFullYear()} by IronIA Fintech</Text>
              </div>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Text className="title">Links de interés</Text>
              <Stack verticalAlign="start" className="links">
                <Text>Aviso Legal</Text>
                <Text>Nuestro equipo</Text>
                <Text>Careers</Text>
              </Stack>
              <Text className="title">Síguenos en nuestras redes sociales:</Text>
              <Stack className="social-networks">
                <DefaultButton><FacebookIcon /></DefaultButton>
                <DefaultButton><YoutubeIcon /></DefaultButton>
                <DefaultButton><TwitterIcon /></DefaultButton>
                <DefaultButton><LinkedinIcon /></DefaultButton>
              </Stack>
              <Text className="title">En colaboración con:</Text>
              <Stack className="sponsors">
                <Image
                  src={logo_cnmv}
                  alt="CNMV"
                />
                <Image
                  src={logo_diaphanum}
                  alt="Diaphanum"
                />
                <Image
                  src={logo_fintech}
                  alt="FINTECH e INSURTECH"
                />
              </Stack>
            </div>
          </div>
        </StyledFooter>
      )}
    </ThemeContext.Consumer>
  )
};

export default Footer;

