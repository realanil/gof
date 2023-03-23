import * as React from 'react';

import { realityCheckConfigurationContext } from './realityCheckConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class RealityCheckConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <realityCheckConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </realityCheckConfigurationContext.Provider>
        );
    }
}

export default RealityCheckConfigurationProvider;
