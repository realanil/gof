import * as React from 'react';

import {MultiplierConfigurationContext} from './multiplierConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class MultiplierConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <MultiplierConfigurationContext.Provider value={{...rest}}>
                {children}
            </MultiplierConfigurationContext.Provider>
        );
    }
}

export default MultiplierConfigurationProvider;
