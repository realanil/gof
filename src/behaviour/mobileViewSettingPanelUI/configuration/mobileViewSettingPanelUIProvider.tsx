import * as React from 'react';

import {MobileViewSettingPanelUIConfigurationContext} from './mobileViewSettingPanelUIConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class MobileViewSettingPanelUIProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <MobileViewSettingPanelUIConfigurationContext.Provider value={{...rest}}>
                {children}
            </MobileViewSettingPanelUIConfigurationContext.Provider>
        );
    }
}

export default MobileViewSettingPanelUIProvider;
