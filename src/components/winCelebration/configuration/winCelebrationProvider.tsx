import * as React from 'react';

import {winCelebrationConfigurationContext} from './winCelebrationConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class WinCelebrationConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <winCelebrationConfigurationContext.Provider value={{...rest}}>
                {children}
            </winCelebrationConfigurationContext.Provider>
        );
    }
}

export default WinCelebrationConfigurationProvider;
