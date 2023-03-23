import * as React from 'react';

import {CanvasMobilePaytablePortraitConfigurationContext, frameworkCanvasMobilePaytablePortrait} from './canvasMobilePaytablePortraitConfiguration';

const withCanvasMobilePaytablePortraitConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <CanvasMobilePaytablePortraitConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCanvasMobilePaytablePortrait}/>
                );
            }}
        </CanvasMobilePaytablePortraitConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCanvasMobilePaytablePortraitConfiguration;