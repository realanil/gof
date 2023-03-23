import * as React from 'react';

import { NoInternetPopUpConfigurationContext } from './noInternetPopUpConfiguration';



interface IProps {
    children: React.ReactElement;

}

export class NoInternetPopUpConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <NoInternetPopUpConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </NoInternetPopUpConfigurationContext.Provider>
        );
    }
}

export default NoInternetPopUpConfigurationProvider;
