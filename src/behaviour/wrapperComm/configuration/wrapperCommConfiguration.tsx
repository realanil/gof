import React from "react";
 

interface IframeworkWrapperComm {
    data: {}

}

export const frameworkWrapperComm: IframeworkWrapperComm = {

    data: {
        "COMPONENTS": [],
    }
};

export const WrapperCommConfigurationContext = React.createContext(
    {}
);