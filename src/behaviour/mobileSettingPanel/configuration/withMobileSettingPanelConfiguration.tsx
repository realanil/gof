import * as React from 'react';

import {
    MobileSettingPanelConfigurationContext,
    frameworkMobileSettingPanel
} from './mobileSettingPanelConfiguration';

const withMobileSettingPanelConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <MobileSettingPanelConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkMobileSettingPanel}/>
                );
            }}
        </MobileSettingPanelConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withMobileSettingPanelConfiguration;