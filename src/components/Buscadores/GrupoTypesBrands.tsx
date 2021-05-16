import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from '@fluentui/react';
import {DropdownBasic} from "../Subscriptions/SelectUiComponen";

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



export const GrupoTypesBrands = () => {
    return (
        <Stack tokens={sectionStackTokens}>
            <Stack horizontal horizontalAlign="center">
                <Stack>
                    <Stack horizontal styles={stackStyles} tokens={themedLargeStackTokens}>
                        <DropdownBasic
                            placeHolderProps="Categoria del fondo"
                            optionsProps={[]}
                            labelProps="label"
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
