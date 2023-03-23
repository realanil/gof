import * as React from 'react';

import {HorizontalGridsConfigurationContext} from './horizontalGridconfiguration';


interface IProps {
    children: React.ReactElement;

}

export class HorizontalGridsConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <HorizontalGridsConfigurationContext.Provider value={{...rest}}>
                {children}
            </HorizontalGridsConfigurationContext.Provider>
        );
    }
}

export default HorizontalGridsConfigurationProvider;
