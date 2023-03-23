import * as React from 'react';

import { realityCheckConfigurationContext, frameworkRealityCheck } from './realityCheckConfiguration';

const withRealityCheckConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <realityCheckConfigurationContext.Consumer>
            {(): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkRealityCheck} />
                );
            }}
        </realityCheckConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withRealityCheckConfiguration;