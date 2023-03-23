import * as React from 'react';

import { walletResponseTrackerConfigurationContext, frameworkWalletResponseTracker } from './walletResponseTrackerConfiguration';

const withWalletResponseTrackerConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <walletResponseTrackerConfigurationContext.Consumer>
            {(): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkWalletResponseTracker} />
                );
            }}
        </walletResponseTrackerConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withWalletResponseTrackerConfiguration;