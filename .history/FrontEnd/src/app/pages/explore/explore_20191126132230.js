import React from 'react';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import Autosuggest from 'react-autosuggest';

class Explore extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <div className="t-top-nav-explore" >
                    <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" />
                </div>
            </div>)

    }

}

export default Explore;