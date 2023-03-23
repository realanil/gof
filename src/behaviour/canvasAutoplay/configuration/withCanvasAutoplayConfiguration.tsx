import * as React from 'react';

import {CanvasAutoplayConfigurationContext, frameworkCanvasAutoplay} from './canvasAutoplayConfiguration';

const withCanvasAutoplayConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <CanvasAutoplayConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkCanvasAutoplay}/>
                );
            }}
        </CanvasAutoplayConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withCanvasAutoplayConfiguration;