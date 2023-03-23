import * as React from 'react';

import {CanvasMobileBetConfigurationContext, frameworkCanvasMobileBet} from './canvasMobileBetConfiguration';

const withCanvasMobileBetConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <CanvasMobileBetConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCanvasMobileBet}/>
                );
            }}
        </CanvasMobileBetConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCanvasMobileBetConfiguration;