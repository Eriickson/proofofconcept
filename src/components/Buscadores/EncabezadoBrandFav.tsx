import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from '@fluentui/react';
import CardCompanyComponents from "./CardCompanyComponents";

// Styles definition
const stackStyles: IStackStyles = {
    root: {
        //background: DefaultPalette.themeTertiary,
        width:"100%",
    },
};
// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };

const themedLargeStackTokens: IStackTokens = {
    childrenGap: 'l1',
    padding: 'l1',
};


export const EncabezadoBrandFav: React.FunctionComponent = () => {
    return (
        <Stack tokens={sectionStackTokens}>
            <Stack horizontal horizontalAlign="center">
                <Stack>
                    <Stack horizontal styles={stackStyles} tokens={themedLargeStackTokens}>
                        <CardCompanyComponents />
                        <CardCompanyComponents />
                        <CardCompanyComponents />
                        <CardCompanyComponents />
                        <CardCompanyComponents />
                        <CardCompanyComponents />
                        <CardCompanyComponents />
                        <CardCompanyComponents />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
