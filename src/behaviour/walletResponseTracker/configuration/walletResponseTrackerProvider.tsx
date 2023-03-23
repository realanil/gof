import * as React from 'react';

import { walletResponseTrackerConfigurationContext } from './walletResponseTrackerConfiguration';


interface IProps {
    children: React.ReactElement;

}

export class WalletResponseTrackerConfigurationProvider extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <walletResponseTrackerConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </walletResponseTrackerConfigurationContext.Provider>
        );
    }
}

export default WalletResponseTrackerConfigurationProvider;
