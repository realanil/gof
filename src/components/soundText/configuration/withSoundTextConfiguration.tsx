import * as React from 'react';

import { soundTextConfigurationContext, frameworkSoundText } from './soundTextConfiguration';

const withSoundTextConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <soundTextConfigurationContext.Consumer>
            {(): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkSoundText} />
                );
            }}
        </soundTextConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withSoundTextConfiguration;