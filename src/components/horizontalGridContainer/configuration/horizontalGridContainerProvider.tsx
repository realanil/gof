import * as React from 'react';

import {HorizontalGridContainerConfigurationContext} from './horizontalGridContainerConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class HorizontalGridContainerConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;
        return (
            <HorizontalGridContainerConfigurationContext.Provider value={{...rest}}>
                {children}
            </HorizontalGridContainerConfigurationContext.Provider>
        );
    }
}

export default HorizontalGridContainerConfigurationProvider;
