import * as React from 'react';

import { soundTextConfigurationContext } from './soundTextConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class SoundTextConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <soundTextConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </soundTextConfigurationContext.Provider>
        );
    }
}

export default SoundTextConfigurationProvider;
