import * as React from 'react';

import {CanvasMobilePaytablePortraitConfigurationContext} from './canvasMobilePaytablePortraitConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class CanvasMobilePaytablePortraitConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <CanvasMobilePaytablePortraitConfigurationContext.Provider value={{...rest}}>
                {children}
            </CanvasMobilePaytablePortraitConfigurationContext.Provider>
        );
    }
}

export default CanvasMobilePaytablePortraitConfigurationProvider;
