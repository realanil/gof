import * as React from 'react';

import {
    CanvasDesktopSettingPanelConfigurationContext,
    frameworkCanvasDesktopSettingPanel
} from './canvasDesktopSettingPanelConfiguration';

const withCanvasDesktopSettingPanelConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <CanvasDesktopSettingPanelConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCanvasDesktopSettingPanel}/>
                );
            }}
        </CanvasDesktopSettingPanelConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCanvasDesktopSettingPanelConfiguration;