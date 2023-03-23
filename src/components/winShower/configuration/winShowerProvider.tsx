import * as React from 'react';

import {winShowerConfigurationContext} from './winShowerConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class WinShowerConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <winShowerConfigurationContext.Provider value={{...rest}}>
                {children}
            </winShowerConfigurationContext.Provider>
        );
    }
}

export default WinShowerConfigurationProvider;
