import * as React from 'react';

import {CanvasMobilePaytableConfigurationContext, frameworkCanvasMobilePaytable} from './canvasMobilePaytableConfiguration';

const withCanvasMobilePaytableConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <CanvasMobilePaytableConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCanvasMobilePaytable}/>
                );
            }}
        </CanvasMobilePaytableConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCanvasMobilePaytableConfiguration;