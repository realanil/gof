import * as React from 'react';

import {
    MobileViewSettingPanelUIConfigurationContext,
    frameworkMobileViewSettingPanelUI
} from './mobileViewSettingPanelUIConfiguration';

const withMobileViewSettingPanelUIConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <MobileViewSettingPanelUIConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkMobileViewSettingPanelUI}/>
                );
            }}
        </MobileViewSettingPanelUIConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withMobileViewSettingPanelUIConfiguration;