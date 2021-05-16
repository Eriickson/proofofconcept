import * as React from "react";
import { Separator } from '@fluentui/react/lib/Separator';
import styled from "styled-components";

type Props = {
  theme: any,
  className: string,
  identificator:string
  toggleTheme: () => void
}

const Toggle : React.FC<Props>  = ({ theme, className, identificator, toggleTheme } ) => {
  const Button = styled.button`
    background: ${props => // @ts-ignore
      `${theme.palette.borderTertiary}`};
    border: ${props => // @ts-ignore
      `1px solid ${theme.palette.borderPrimary}`};
    border-radius: 100px;
    width: 48px;
    height: 24px;
    margin-top: 16px;
    box-sizing: border-box;
    cursor: pointer;
    padding: 0;
    > div {
      display: inline-block;
      height: 12px;
      padding: 0;
      margin: 2px;
      width: 1px;
      background:  ${props => // @ts-ignore
        `${theme.palette.borderQuaternary}`};
      &:after {
        display: none;
      }
    }
  `;

  const Icon = styled.i`
     background: ${props => // @ts-ignore
       `${theme.palette.themePrimary}`};
     border: ${props => // @ts-ignore
       `1px solid ${theme.palette.borderTertiary}`};
     border-radius: 12px;
     display: inline-block;
     box-sizing: border-box;
     width: 20px;
     height: 20px;
     line-height: 18px;
     vertical-align: middle;
     &:after {
       font-size: 13px !important;
       color: ${props => // @ts-ignore
        `${theme.palette.borderTertiary}`};
     }
     &.light.moonlight,
     &.dark.daylight {
       background: ${props => // @ts-ignore
         `${theme.palette.borderTertiary}`};
       &:after {
         color:  ${props => // @ts-ignore
          `${theme.palette.borderQuaternary}`} !important;
       }
     }
     &.moonlight{
       background: #FFFF;
       &:after {
         font-size: 15px !important;
       }
     }
     &.moonlight.dark {
       border: ${props => // @ts-ignore
         `1px solid ${theme.palette.borderPrimary}`};
       box-shadow: ${props => // @ts-ignore
         `0px 0px 16px ${theme.palette.shadow}`};
     }
  `;

  return (
    <div className={"toggle " + className} id={identificator}>
        <Button
          // @ts-ignore
          href="/" title="Cambiar de tema" onClick={() => toggleTheme()}>
        <Icon
          // @ts-ignore
          className={"ironia-icon daylight " + theme.palette.name} />
        <Separator vertical />
        <Icon
          // @ts-ignore
          className={"ironia-icon moonlight " + theme.palette.name} />
      </Button>
    </div>
  );
};

export default Toggle;
