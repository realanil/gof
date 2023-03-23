import * as React from 'react';

import {MobileSettingPanelConfigurationContext} from './mobileSettingPanelConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class MobileSettingPanelProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <MobileSettingPanelConfigurationContext.Provider value={{...rest}}>
                {children}
            </MobileSettingPanelConfigurationContext.Provider>
        );
    }
}

export default MobileSettingPanelProvider;
