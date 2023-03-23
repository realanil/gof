import * as React from 'react';

import {
    HorizontalGridContainerConfigurationContext,
    frameworkHorizontalGridContainer
} from './horizontalGridContainerConfiguration';

const withHorizontalGridContainerConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <HorizontalGridContainerConfigurationContext.Consumer>
            {(): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkHorizontalGridContainer}/>
                );
            }}
        </HorizontalGridContainerConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withHorizontalGridContainerConfiguration;