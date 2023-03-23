import * as React from 'react';

import {HorizontalSymbolConfigurationContext} from './horizontalSymbolConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class HorizontalSymbolConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <HorizontalSymbolConfigurationContext.Provider value={{...rest}}>
                {children}
            </HorizontalSymbolConfigurationContext.Provider>
        );
    }
}

export default HorizontalSymbolConfigurationProvider;
