import * as React from 'react';

import { WrapperCommConfigurationContext, frameworkWrapperComm } from './wrapperCommConfiguration';

const withWrapperCommConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <WrapperCommConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkWrapperComm} />
                );
            }}
        </WrapperCommConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withWrapperCommConfiguration;