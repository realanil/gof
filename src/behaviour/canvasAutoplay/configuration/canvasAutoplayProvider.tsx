import * as React from 'react';

import {CanvasAutoplayConfigurationContext} from './canvasAutoplayConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class CanvasAutoplayConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <CanvasAutoplayConfigurationContext.Provider value={{...rest}}>
                {children}
            </CanvasAutoplayConfigurationContext.Provider>
        );
    }
}

export default CanvasAutoplayConfigurationProvider;
