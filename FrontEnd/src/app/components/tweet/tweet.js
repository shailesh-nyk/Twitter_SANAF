
import React from 'react';
import config from './../../../config/app-config';
import axios from 'axios';

class Tweet extends React.Component { 
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            data: this.props.data,
            currentUser: "Shailesh",
            hasLiked: this.props.data.likes.includes("Shailesh") ,
            hasRT: this.props.data.retweetCount.includes("Shailesh")
        })
    }
    render() {
        return ( 
            <div className="t-tweet-container">
                <div>
                    <img class="t-tweet-avatar" src={config.base + this.state.data.user.avatar}/>
                </div>
                <div class="t-tweet-right">
                    <div>
                        <span className="t-primary-bold"> {this.state.data.user.name} </span>
                        <span className="t-secondary"> @{this.state.data.user.handle}</span>
                        <span className="t-secondary" style={{marginLeft: "40px"}}> {this.state.data.timeElapsed}</span>
                    </div>
                    <div>
                        <p>{this.state.data.text}</p>
                        {this.state.data.image ? (
                            <img class='t-tweet-pic' src={config.base + this.state.data.image}/>
                        ) : (null)}
                    </div>
                    <div className="t-tweet-actions t-secondary">
                        <span className="t-comment"> <i class="far fa-comment-alt"></i> {this.state.data.comments.length}</span>  
                        <span className="t-retweet"> 
                            <i class="fas fa-retweet"></i> 
                            {this.state.data.retweetCount.length}
                        </span>
                        <span className="t-like"> 
                            <i class={this.state.hasLiked ? "fas fa-heart t-liked" : "far fa-heart"} onClick={() => this.likeTweet()}></i> 
                            {this.state.data.likes.length} 
                        </span>  
                    </div>
                </div>
            </div>
        )
    }
    likeTweet() {
        let body = {
            id: this.state.data._id,
            user_id: this.state.currentUser
        }
        if(this.state.hasLiked) {
            this.unlikeTweet(body);
        } else {
            axios.put(config.api_host + '/tweet/like', body)
            .then(resp => {
                    if(resp.data.success) {
                        this.getTweet();
                    } 
            });
        }
    }

    unlikeTweet(body) {
        axios.delete(config.api_host + '/tweet/like', { data: body})
        .then(resp => {
                if(resp.data.success) {
                    this.getTweet();
                } 
        });
    }
    getTweet() {
        axios.get(config.api_host + '/tweet', {
            params: {
                id: this.state.data._id
            }
        })
        .then(resp => {
                if(resp.data.success) {
                    this.setState({
                        data: resp.data.payload,
                        hasLiked: resp.data.payload.likes.includes(this.state.currentUser) ,
                        hasRT: resp.data.payload.retweetCount.includes(this.state.currentUser)
                    })
                } 
        });
    }
}

export default Tweet;