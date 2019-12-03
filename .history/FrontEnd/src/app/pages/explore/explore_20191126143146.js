import React from 'react';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import Autosuggest from 'react-autosuggest';

class Explore extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultText: "Search Twitter",
            hashtagSearch: ""
        }
    }

    handleChange = (event) => {
        this.setState({ hashtagSearch: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="t-top-nav-explore" >
                    <div class="t-focus input-group">
                        <div class="input-group-prepend">
                            <div class="t-favicon-search input-group-text" id="inputGroupPrepend2">
                                <i class="fa fa-search" fa-lg></i>
                            </div>
                        </div>
                        <input className="t-textbox form-control" onSubmit={this.getHashtagTweets} onChange={this.handleChange} type="text" id="hashtag"
                            placeholder={this.state.defaultText} value={this.state.hashtagSearch} />
                    </div>
                    <i class="fa fa-cog t-favicon"></i>
                </div>
            </div>
        )

    }

}

export default Explore;