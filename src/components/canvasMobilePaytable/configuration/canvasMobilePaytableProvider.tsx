import * as React from 'react';

import {CanvasMobilePaytableConfigurationContext} from './canvasMobilePaytableConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class CanvasMobilePaytableConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <CanvasMobilePaytableConfigurationContext.Provider value={{...rest}}>
                {children}
            </CanvasMobilePaytableConfigurationContext.Provider>
        );
    }
}

export default CanvasMobilePaytableConfigurationProvider;
