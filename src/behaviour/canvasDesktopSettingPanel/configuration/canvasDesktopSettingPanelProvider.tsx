import * as React from 'react';

import {CanvasDesktopSettingPanelConfigurationContext} from './canvasDesktopSettingPanelConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class CanvasDesktopSettingPanelConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <CanvasDesktopSettingPanelConfigurationContext.Provider value={{...rest}}>
                {children}
            </CanvasDesktopSettingPanelConfigurationContext.Provider>
        );
    }
}

export default CanvasDesktopSettingPanelConfigurationProvider;
