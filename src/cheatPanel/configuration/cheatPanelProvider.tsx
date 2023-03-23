import * as React from 'react';
import {cheatPanelConfigurationContext} from './cheatPanelConfiguration';

interface IProps {
    children: React.ReactElement;
}

export class CheatPanelConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;
        return (
            <cheatPanelConfigurationContext.Provider value={{...rest}}>
                {children}
            </cheatPanelConfigurationContext.Provider>
        );
    }
}

export default CheatPanelConfigurationProvider;
