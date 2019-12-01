
import React from 'react';

class ContainerLoader extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return ( 
            <div className={'t-container-loader-container'}>
              <div className="t-container-loader"></div>
            </div>
        )
    }
}
export default ContainerLoader;