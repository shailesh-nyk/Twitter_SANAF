import React from 'react';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import Autosuggest from 'react-autosuggest';

class Explore extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultText: "Search Twitter",
            hashtagSearch: "",
            tweets : []
        }
    }

    handleChange = (event) => {
        this.setState({ hashtagSearch: event.target.value });
    }

    getHashtagTweets = (event) => {
        var key=event.keyCode || event.which;
        if (key==13){
            console.log("in here");
        }
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
                        <input className="t-textbox form-control" onEnter ={this.getHashtagTweets} onChange={this.handleChange} type="text" id="hashtag"
                            placeholder={this.state.defaultText} value={this.state.hashtagSearch} />
                    </div>
                    <i class="fa fa-cog t-favicon"></i>
                </div>
                { this.state.tweets && this.state.tweets.map( tweet => {
                return <Tweet tweet={tweet}/>
            })}
            </div>
        )

    }

}

export default Explore;