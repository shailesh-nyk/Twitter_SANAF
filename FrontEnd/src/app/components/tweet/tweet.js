
import React from 'react';
import config from './../../../config/app-config';
import axios from 'axios';
import CommentModal from '../../components/comment-modal/comment-modal';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTweetViewData } from '../../../redux/actions/newsfeed-action';
import { bookmarkTweet } from '../../../redux/actions/tweet-action';
import RetweetModal from '../retweet-modal/retweet-modal';
import Retweet from '../retweet/retweet';

class Tweet extends React.Component {
    constructor(props) {
        super(props);
        this.commentOnTweet = this.commentOnTweet.bind(this);
        this.reTweet = this.reTweet.bind(this);

    }
    componentWillMount() {
        if(this.props.tweet) {
            this.setState({
                data: this.props.tweet,
                hasLiked: this.props.tweet.likes.includes(this.props.user.id) ,
                hasRT: this.props.tweet.retweetCount.includes(this.props.user.id),
                hasCommented: this.props.tweet.comments.filter(x => x.user._id == this.props.user.id)
            })
        } else {
            this.getTweet();
        }
    }
    render() {
        console.log(this.props);
        if(this.state.redirectToTweet) {
            return (
                <Redirect to={`/ui/tweet/${this.state.data._id}`} />
            )
        }
        return (
            <div>
            <div className="t-tweet-container" onClick={() => this.redirectToTweet()}>
                <div>
                    <img class="t-tweet-avatar" src={config.base + this.state.data.userId.avatar} onClick={(e) => e.stopPropagation()}/>
                </div>
                <div class="t-tweet-right">
                    <div onClick={(e) => e.stopPropagation()}>
                        <span className="t-primary-bold"> {this.state.data.userId.name} </span>
                        <span className="t-secondary"> @{this.state.data.userId.handle}</span>
                        <span className="t-secondary" style={{marginLeft: "40px"}}> {this.state.data.timeElapsed}</span>
                    </div>
                    <div>
                        <p>{this.state.data.text}</p>
                        {this.state.data.image ? (
                            <img class='t-tweet-pic' src={config.base + this.state.data.image}/>
                        ) : (null)}
                    </div>
                    {this.state.data.parent_id ? (
                         <Retweet retweetID={this.state.data.parent_id}/> 
                    ) : (null)}
                    <div className="t-tweet-actions t-secondary">
                        <span className="t-comment" data-toggle="modal" data-target={"#commentModal"+this.state.data._id} onClick={(e) => e.stopPropagation()}>
                            <i class={this.state.hasCommented.length > 0 ? "fas fa-comment-alt t-commented" : "far fa-comment-alt"}></i>
                            {this.state.data.comments.length}
                        </span>
                        <span className="t-retweet" data-toggle="modal" data-target={"#retweetModal"+this.state.data._id} onClick={(e) => e.stopPropagation()}>
                            <i class="fas fa-retweet"></i>
                            {this.state.data.retweetCount.length}
                        </span>
                        <span className="t-like" onClick={(e) => this.likeTweet(e)}>
                            <i class={this.state.hasLiked ? "fas fa-heart t-liked" : "far fa-heart"}></i>
                            {this.state.data.likes.length}
                        </span>
                        <span className="t-bookmark" onClick={(e) => this.bookmarkTweet(e)}>
                            <i class="far fa-bookmark"></i>
                        </span>
                    </div>
                </div>
            </div>
            <CommentModal data={this.state.data} postComment={this.commentOnTweet}/>
            <RetweetModal data={this.state.data} reTweet={this.reTweet}/>
            </div>
        )
    }   
    redirectToTweet() {
        if(!window.location.pathname.includes('/ui/tweet/')) {
            this.incrementViewCount();
            this.props.setTweetViewData(this.state.data);
            this.setState({
                redirectToTweet: true
            })
            
        }
    }
    likeTweet(e) {
        e.stopPropagation();
        let body = {
            id: this.state.data._id,
            user_id: this.props.user.id
        }
        if(this.state.hasLiked) {
            this.unlikeTweet(body);
        } else {
            axios.put('/api/tweet/like', body)
            .then(resp => {
                    if(resp.data.success) {
                        this.getTweet();
                    }
            });
        }
    }

    unlikeTweet(body) {
        axios.delete('/api/tweet/like', { data: body})
        .then(resp => {
                if(resp.data.success) {
                    this.getTweet();
                }
        });
    }

    bookmarkTweet(e) {
        e.stopPropagation();
        this.props.bookmarkTweet({
            tweet_id: this.state.data._id
        })
    }

    getTweet() {
        axios.get('/api/tweet', {
            params: {
                id: this.state.data._id
            }
        })
        .then(resp => {
                if(resp.data.success) {
                    this.setState({
                        data: resp.data.payload,
                        hasLiked: resp.data.payload.likes.includes(this.props.user.id) ,
                        hasRT: resp.data.payload.retweetCount.includes(this.props.user.id),
                        hasCommented: resp.data.payload.comments.filter(x => x.user._id == this.props.user.id)
                    })
                }
        });
    }

    commentOnTweet(text) {
        let body = {
            text : text,
            user : this.props.user.id,
            id: this.state.data._id
        }
        axios.post('/api/tweet/comment', body)
            .then(resp => {
                if(resp.data.success) {
                    this.getTweet();
                }
        });
    }
    reTweet(text) {
        debugger;
        let body = {
            text : text,
            tweet_id: this.state.data._id
        }
        axios.post('/api/tweet/retweet', body)
            .then(resp => {
                if(resp.data.success) {
                    this.getTweet();
                }
        });
    }
    incrementViewCount() {
        let body = {
            id: this.state.data._id
        }
        axios.put('/api/tweet/view', body);
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
       setTweetViewData: payload => dispatch(setTweetViewData(payload)),
       bookmarkTweet: payload => dispatch(bookmarkTweet(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tweet);