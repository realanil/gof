import * as React from 'react';

import {HorizontalSymbolConfigurationContext, frameworkHorizontalSymbol} from './horizontalSymbolConfiguration';

const withHorizontalSymbolConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <HorizontalSymbolConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkHorizontalSymbol}/>
                );
            }}
        </HorizontalSymbolConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withHorizontalSymbolConfiguration;