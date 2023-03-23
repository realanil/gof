import * as React from 'react';

import {CanvasMobileBetConfigurationContext} from './canvasMobileBetConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class CanvasMobileBetConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <CanvasMobileBetConfigurationContext.Provider value={{...rest}}>
                {children}
            </CanvasMobileBetConfigurationContext.Provider>
        );
    }
}

export default CanvasMobileBetConfigurationProvider;