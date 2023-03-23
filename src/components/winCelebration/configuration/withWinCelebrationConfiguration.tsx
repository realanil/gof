import * as React from 'react';

import {winCelebrationConfigurationContext, frameworkWinCelebration} from './winCelebrationConfiguration';

const withWinCelebrationConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <winCelebrationConfigurationContext.Consumer>
            {(): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkWinCelebration}/>
                );
            }}
        </winCelebrationConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withWinCelebrationConfiguration;