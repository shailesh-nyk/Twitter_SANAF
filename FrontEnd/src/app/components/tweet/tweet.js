
import React from 'react';
import config from './../../../config/app-config';

class Tweet extends React.Component { 
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
        return ( 
            <div className="t-tweet-container">
                <div>
                    <img class="t-tweet-avatar" src={config.base + this.props.data.user.avatar}/>
                </div>
                <div class="t-tweet-right">
                    <div>
                        <span className="t-primary-bold"> {this.props.data.user.name} </span>
                        <span className="t-secondary"> @{this.props.data.user.handle}</span>
                        <span className="t-secondary"> {this.props.data.postedOn}</span>
                    </div>
                    <div>
                        <p>{this.props.data.text}</p>
                        {this.props.data.image ? (
                            <img class='t-tweet-pic' src={config.base + this.props.data.image}/>
                        ) : (null)}
                    </div>
                    <div className="t-tweet-actions t-secondary">
                        <span className="t-comment"> <i class="far fa-comment-alt"></i> {this.props.data.comments.length}</span>  
                        <span className="t-retweet"> <i class="fas fa-retweet"></i> {this.props.data.retweetCount}</span>
                        <span className="t-like"> <i class="far fa-heart"></i> {this.props.data.likes} </span>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Tweet;