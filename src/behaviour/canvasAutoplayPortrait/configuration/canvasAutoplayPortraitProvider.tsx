import * as React from 'react';

import {CanvasAutoplayPortraitConfigurationContext} from './canvasAutoplayPortraitConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class CanvasAutoplayPortraitConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const {children, ...rest} = this.props;

        return (
            <CanvasAutoplayPortraitConfigurationContext.Provider value={{...rest}}>
                {children}
            </CanvasAutoplayPortraitConfigurationContext.Provider>
        );
    }
}

export default CanvasAutoplayPortraitConfigurationProvider;
