import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  a {
    color: #CC214F
  }

  input {
    background-color: ${(
      props, // @ts-ignore
    ) => props.theme.palette.borderSecondary} !important;
    &.ms-SearchBox-field {
      border: ${(
        props, // @ts-ignore
      ) => "1px solid " + props.theme.palette.neutralBorder} !important
    }
  }

  .ms-Card {
    background: ${(props: { theme: { palette: { neutralLighter: any } } }) =>
      props.theme.palette.neutralLighter};
  }

  .ms-Nav {
    margin-top: 40px;
    margin-bottom: 20px;

    .ms-Nav-compositeLink {
      button {
        span {
          margin-left: 20px;
        }
      }
      &.is-selected {
        button {
          background: ${(
            props, // @ts-ignore
          ) => props.theme.palette.tertiary};
          &:after {
            border-left-width: 6px;
          }
          span {
            .ironia-icon {
              color: ${(
                props, // @ts-ignore
              ) => props.theme.palette.themePrimary};
            }
            .ms-Nav-linkText {
              color: ${(
                props, // @ts-ignore
              ) => props.theme.palette.themePrimary} !important;
            }
          }
        }
      }
    }
  }

  .ms-Button {
    min-width: unset;
    &.icon-button {
      border: 0;
      padding: 0;
      background: none;
      color: ${(
        props, // @ts-ignore
      ) => props.theme.palette.white};
    }
  }

  .shadow {
    background: ${(
      props, // @ts-ignore
    ) => props.theme.palette.shadowBackground};
    box-shadow: ${(props) =>
      "0px 0px 16px " + // @ts-ignore
      props.theme.palette.shadow};
  }

  .ms-DetailsRow-cell {
    color: ${(
      props, // @ts-ignore
    ) => props.theme.palette.black};
  }

  .highcharts-legend-item text {
    fill: ${(
      props, // @ts-ignore
    ) => props.theme.palette.black} !important;
  }

  #root {
    background: ${(
      props, // @ts-ignore
    ) => props.theme.palette.body} !important;

    #header {
      background: ${(
        props, // @ts-ignore
      ) => props.theme.palette.background};
      button {
        .ironia-icon {
          color: ${(
            props, // @ts-ignore
          ) => props.theme.palette.black};
        }
      }
    }

    footer {
      background: ${(
        props, // @ts-ignore
      ) => props.theme.palette.darkBackground};
    }
  }

  h3 {
    &.red {
      color: #CC214F;
    }
  }

  p {
    &.description {
      color: #556769;
    }
  }

  dt {
    color: #2A4143;
  }

  dd {
    color: #556769
  }

  .primary-button {
    background: #CC214F;
    box-shadow: 0px 0px 16px rgba(8, 84, 117, 0.08);
    color: #FFFFFF;
    &:hover {
      background: #D64D73;
      box-shadow: 0px 2px 64px rgba(8, 84, 117, 0.12), 0px 1px 20px rgba(8, 84, 117, 0.12);
    }
    &:active {
      background: #B31540;
    }
    &.disabled {
      background: #DFE3E3;
      color: #93AEB9;
    }
    &.inactive {
      background: #CC214F;
      opacity: 0.3;
    }
  }

  .secondary-button {
    background: #FFFFFF;
    border: 2px solid #CC214F;
    color: #CC214F;
    &:hover {
      background: #FAE9ED;
      border: 2px solid #F1BAC9;
      box-shadow: 0px 2px 64px rgba(8, 84, 117, 0.12), 0px 1px 20px rgba(8, 84, 117, 0.12);
    }
    &:active {
      border: 2px solid #B31540;
    }
    &.disabled {
      opacity: 0.3;
      color: #CC214F;
    }
  }

  div {
    &.blue {
      background: rgba(217,230,250,0.5);
      color: #556769;
      > span {
        color: #556769;
      }
    }

    &.green {
      color: #1BB3AD;
    }

    &.grey {
      background: #F3F7F9;
    }
  }

  span {
    font-family: Barlow;
    &.circled {
      display: inline-block;
      border-radius: 20px;
      padding: 3.5px 10.5px;
    }
    &.red {
      background: #CC214F;
      color: white;
    }
    &.blue {
      color: #4284E6;
    }
    &.legend {
      color: #95A0A1;
      margin-bottom: 24px;
    }
  }

  .ms-Stack:focus {
    border: 1px solid #cc214f;
  }

  .ms-Callout.profile-actions {
    border-radius: 24px;
    margin-right: -56px;
    .ms-Callout-beak {
      background: #FFFFFF !important;
      right: 64px !important;
    }
    .ms-Callout-beakCurtain {
      border-radius: 24px;
    }
    .ms-Callout-main {
      border-radius: 24px;
      padding: 24px;
      background: #FFFFFF;
      .header {
        box-sizing: content-box;
        border-radius: 16px;
        background: #F3F7F9;
        padding: 16px;
        margin-bottom: 16px;
        .ms-Persona-initials {
          background: #FFF1BE;
          span {
            color: #FFBD70;
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            vertical-align: 9px;
          }
        }
        .ms-Persona-details {
          .ms-Persona-primaryText {
            height: 24px;
            margin-bottom: 2px;
            .ms-TooltipHost {
              font-size: 16px;
              line-height: 24px;
              font-weight: 700;
              color: #2A4143;
            }
          }
          .ms-Persona-secondaryText {
            height: 20px;
            .ms-TooltipHost {
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              color: #CC214F;
              &:after {
                display: none;
              }
            }
          }
        }
      }
      .ms-FocusZone {
        .ms-Nav {
          border: 0;
          .ms-Nav-group {
            .ms-Nav-groupContent {
              margin-bottom: 0;
              ul.ms-Nav-navItems {
                li.ms-Nav-navItem {
                  border-bottom: 1px solid rgba(204,33,79,0.2);
                  height: 66px;
                  margin: 0;
                  .ms-Button {
                    height: 66px;
                    .ms-Nav-linkText {
                      color: #2A4143;
                      font-size: 14px;
                      font-weight: 500;
                      line-height: 66px;
                    }
                  }
                  &:last-child {
                    border-bottom: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .ms-Panel-main {
    background: ${(
      props, // @ts-ignore
    ) => `${props.theme.palette.linearGradient}`};
    box-shadow: 0px 2px 64px rgba(8, 84, 117, 0.12), 0px 1px 20px rgba(8, 84, 117, 0.12);

    .ms-Panel-commands {
      display: none;
    }

    .ms-Panel-content {
      padding-left: 56px;
      width: 400px;
      color: ${(
        props, // @ts-ignore
      ) => `${props.theme.palette.white}`};

      .icon-button {
        margin-top: 16px;
      }

      .ms-Image {
        width: auto;
        display: inline-block;
        margin-top: -2px;
      }

      .separator {
        opacity: 0.2;
        height: 32px;
        margin: 0;
        &.vertical {
          margin: 16px 20px 0 30px;
        }
      }

      span {
        &.fs12 {
          font-size: 12px;
          line-height: 26px;
        }
        &.fs16 {
          font-size: 16px;
          line-height: 22px;
        }
      }

      label {
        color: ${(
          props, // @ts-ignore
        ) => `${props.theme.palette.white}`};
      }

      .ms-Toggle {
        margin-top: 10px;
      }

      .primary-button {
        width: fit-content;
        padding: 28px 58px;
        border: 0;
        margin-top: 24px;
        border-radius: 100px;

        .ms-Button-label {
          font-weight: 600 !important;
        }
      }

      h4 {
        margin-top: 56px;
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;
      }

      .social-networks {
        display: block;
        margin-top: 10px;
        button {
          min-width: 0;
          width: 56px;
          height: 32px;
          text-align: center;
          background: ${(
            props, // @ts-ignore
          ) => `${props.theme.palette.quinary}`};
          border-radius: 32px;
          margin-left: 16px;
          padding: 0;
          border: 0;
          &:first-of-type {
            margin-left: 0;
          }
          span {
            color: ${(
              props, // @ts-ignore
            ) => `${props.theme.palette.senary}`};
            svg {
              path {
                fill: currentColor;
              }
            }
          }
        }
      }

      .ms-Nav {
        border: 0;
        margin-left: -56px;
        .ms-Nav-navItem {
          margin-bottom: 20px;
          .ms-Nav-compositeLink {
            button {
              padding-left: 18px;
              color: ${(
                props, // @ts-ignore
              ) => `${props.theme.palette.dust}`};
              .ms-Nav-linkText {
                font-size: 28px;
                line-height: 36px;
                font-weight: 800;
              }

              &:hover {
                background: ${(
                  props, // @ts-ignore
                ) => `${props.theme.palette.borderPrimary}`};
                color: ${(
                  props, // @ts-ignore
                ) => `${props.theme.palette.black}`};
              }
            }

            &.is-selected {
              background: transparent;
              button {
                background: transparent;
                &:after {
                  border: 0;
                  width: 6px;
                  background: ${(
                    props, // @ts-ignore
                  ) => `${props.theme.palette.themePrimary}`};
                  border-radius: 40px;
                  left: 2px;
                }
              }
            }

            &.is-disabled {
              button {
                color: ${(
                  props, // @ts-ignore
                ) => `${props.theme.palette.dust}`};
                opacity: 0.2;
              }

              &:hover {
                background: none;
                button {
                  background: none;
                }
              }
            }
          }
        }
      }
    }
  }

  #main-element {
    background: ${(
      props, // @ts-ignore
    ) => `${props.theme.palette.white}`};
    color: ${(
      props, // @ts-ignore
    ) => `${props.theme.palette.black}`};
  }

  @media only screen and (max-width: 640px) {
    .ms-Panel-main {
      background: ${(
        props, // @ts-ignore
      ) => `${props.theme.palette.linearGradientSmall}`};
      .ms-Panel-content {
        width: 100%;
        box-sizing: border-box;
        padding-left: 16px;
        padding-right: 16px;

        .ms-Stack {
          .separator {
            margin-left: 22px;
            margin-right: 0;
          }
        }

        .ms-SearchBox {
          border-radius: 100px;
          border: 0;
          height: 40px;
          margin: 26px 0;
          background: ${(
            props, // @ts-ignore
          ) => `${props.theme.palette.nonary}`};

          .ms-SearchBox-icon {
            i.ironia-icon:after {
              font-size: 16px;
              line-height: 22px;
            }
          }

          input {
            border: 0;
            border-radius: 100px;
            line-height: 40px;
            background: ${(
              props, // @ts-ignore
            ) => `${props.theme.palette.nonary}`} !important;

            &::placeholder {
              color: #556769;
            }
          }

          &:after {
            border-radius: 100px;
          }
        }

        h4 {
          margin-top: 16px;
          font-size: 14px;
          line-height: 20px;
        }

        span {
          &.fs16 {
            font-size: 14px;
            line-height: 20px;
          }
        }

        .persona-component {
          width: 100%;
          border-color: ${(
            props, // @ts-ignore
          ) => `${props.theme.palette.octary}`};
          .ms-Persona {
            width: calc(100% - 50px);
            .ms-Persona-coin {
              .ms-Persona-presence {
                border-color: ${(
                  props, // @ts-ignore
                ) => `${props.theme.palette.black}`};
              }
            }
            .ms-Persona-details {
              padding-left: 15px;
              .ms-Persona-primaryText {
                .ms-TooltipHost {
                  color: ${(
                    props, // @ts-ignore
                  ) => `${props.theme.palette.white}`} !important;
                }
              }
            }
          }
          button {
            background: ${(
              props, // @ts-ignore
            ) => `${props.theme.palette.quinary}`};
            color: ${(
              props, // @ts-ignore
            ) => `${props.theme.palette.septary}`};
            border: 0 !important;
            transform: rotate(-90deg);
          }
        }

        .ms-Nav {
          margin: 0 0 0 -16px;

          .ms-Nav-navItem {
            .ms-Nav-compositeLink {
              button {
                padding-left: 16px;

                span {
                  margin: 0;

                  .ms-Nav-linkText {
                    font-size: 24px;
                    line-height: 32px;
                  }
                }
              }
            }
          }
        }

        > .ms-Stack {
          margin-left: 14px;
          margin-right: 14px;
          &:first-of-type {
            margin-left: 0;
            margin-right: 0;
          }
        }

        .separator,
        > span {
          margin-left: 14px;
          margin-right: 14px;
        }
      }
    }
  }
`;

export default GlobalStyle;
