import React from 'react';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import { setMessage } from './../../../redux/actions/util-action';
import axios from 'axios';


class Explore extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultText: "Search Twitter",
            hashtagSearch: "",
            tweets : [],
            message : ""
        }
    }

    handleChange = (event) => {
        this.setState({ hashtagSearch: event.target.value });
    }

    getHashtagTweets = (event) => {
        var key=event.keyCode || event.which;
        if (key==13){
            axios.post(config.api_host + "tweet/getHashtagTweets?hashtag="+event.target.value)
            .then(resp => {
                if(resp.success == true){
                    if(resp.payload == null ){
                        this.setState({message : resp.msg});
                    } else {
                        this.setState({tweets : resp.payload})
                    }
                } else {
                    setMessage({
                        msg: "Hashtag search failed! Try again",
                        name: 'danger'
                    })
                    this.setState( { hashtagSearch:"" });
                }
            })
            .catch( err => {
                setMessage({
                    msg: "Hashtag search failed! "+err.message+" Try again",
                    name: 'danger'
                })
                this.setState( { hashtagSearch:"" });
            })
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
                        <input className="t-textbox form-control" onKeyPress={this.getHashtagTweets} onChange={this.handleChange} type="text" id="hashtag"
                            placeholder={this.state.defaultText} value={this.state.hashtagSearch} />
                    </div>
                    <i class="fa fa-cog t-favicon"></i>
                </div>
                {
                    this.state.message
                }
                { this.state.tweets && this.state.tweets.map( tweet => {
                return <Tweet tweet={tweet}/>
            })}
            </div>
        )

    }

}

export default Explore;