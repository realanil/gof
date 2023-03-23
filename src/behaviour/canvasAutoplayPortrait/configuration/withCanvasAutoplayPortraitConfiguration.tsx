import * as React from 'react';

import {CanvasAutoplayPortraitConfigurationContext, frameworkCanvasAutoplay} from './canvasAutoplayPortraitConfiguration';

const withCanvasAutoplayPortraitConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <CanvasAutoplayPortraitConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCanvasAutoplay}/>
                );
            }}
        </CanvasAutoplayPortraitConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCanvasAutoplayPortraitConfiguration;