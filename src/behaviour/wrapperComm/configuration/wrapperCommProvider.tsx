import * as React from 'react';
import { WrapperCommConfigurationContext } from './wrapperCommConfiguration';



interface IProps {
    children: React.ReactElement;

}

export class WrapperCommConfigurationProvider extends React.Component<IProps> {


    constructor(props: IProps) {
        super(props);
    }

    render(): any {
        const { children, ...rest } = this.props;

        return (
            <WrapperCommConfigurationContext.Provider value={{ ...rest }}>
                {children}
            </WrapperCommConfigurationContext.Provider>
        );
    }
}
export default WrapperCommConfigurationProvider;
