import * as React from 'react';

import {cheatPanelConfigurationContext, frameworkCheatPanel} from './cheatPanelConfiguration';

const withCheatPanelConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <cheatPanelConfigurationContext.Consumer>
            {(): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCheatPanel}/>
                );
            }}
        </cheatPanelConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCheatPanelConfiguration;