
import React from 'react';
import config from './../../../config/app-config';
import axios from 'axios';
import CommentModal from '../../components/comment-modal/comment-modal';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTweetViewData } from '../../../redux/actions/newsfeed-action';
import { bookmarkTweet, notifyFollowers } from '../../../redux/actions/tweet-action';
import RetweetModal from '../retweet-modal/retweet-modal';
import Retweet from '../retweet/retweet';
import { setMessage } from './../../../redux/actions/util-action';

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
    componentWillReceiveProps(next) {
        if(next.tweet._id !== this.props.tweet._id) {
            this.getTweet(next.tweet._id);
        }
    }
    render() {
        if(this.state.redirectToTweet) {
            return (
                <Redirect to={ {
                    pathname: `/ui/tweet/${this.state.data._id}`,
                    state:  {
                        prev: window.location.pathname
                    }
                }}/>
            )
        }
        return (
            <div>
            <div className="t-tweet-container" onClick={() => this.redirectToTweet()}>
                <div>
                    <img class="t-tweet-avatar" src={config.image_server + this.state.data.userId.avatar} onClick={(e) => e.stopPropagation()}/>
                </div>
                <div class="t-tweet-right">
                    <div onClick={(e) => e.stopPropagation()}>
                        <Link className="t-profile-link t-primary-bold" to={'/ui/userprofile/' + this.state.data.userId._id} >{this.state.data.userId.name}</Link>
                        <span className="t-secondary" style={{marginLeft: "16px"}}> @{this.state.data.userId.handle}</span>
                        <span className="t-secondary" style={{marginLeft: "40px"}}> {this.state.data.timeElapsed}</span>
                    </div>
                    <div>
                        <p>{this.state.data.text}</p>
                        {this.state.data.image ? (
                            <img class='t-tweet-pic' src={config.image_server + this.state.data.image}/>
                        ) : (null)}
                    </div>
                    {this.state.data.parent_id ? (
                        <div>
                            <span class="t-secondary"> <i class="fas fa-retweet"></i> retweeted</span>
                            <Retweet retweetID={this.state.data.parent_id} isOpen={true}/> 
                        </div>
                         
                    ) : (null)}
                    <div className="t-tweet-actions t-secondary">
                        <span className="t-comment" data-toggle="modal" data-target={"#commentModal"+this.state.data._id} onClick={(e) => e.stopPropagation()}>
                            <i class={this.state.hasCommented.length > 0 ? "fas fa-comment-alt t-commented" : "far fa-comment-alt"}></i>
                            {this.state.data.comments.length}
                        </span>
                        <span className="t-retweet" data-toggle="modal" data-target={"#retweetModal"+this.state.data._id} onClick={(e) => e.stopPropagation()}>
                            <i class={this.state.hasRT ? "fas fa-retweet t-retweeted" : "fas fa-retweet"}></i>
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

    getTweet(tweet_id) {
        console.log("INSIDE TWEET GETWEET CALL");
        axios.get('/api/tweet', {
            params: {
                id: tweet_id ? tweet_id : this.state.data._id
            }
        })
        .then(resp => {
                if(resp.data.success) {
                    this.setState({
                        data: resp.data.payload,
                        hasLiked: resp.data.payload.likes.includes(this.props.user.id) ,
                        hasRT: resp.data.payload.retweetCount.includes(this.props.user.id),
                        hasCommented: resp.data.payload.comments.filter(x => x.user._id == this.props.user.id),
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
                    if(window.location.pathname.includes('/ui/tweet/')) { 
                        this.props.updateTweetView(this.state.data._id);
                    } else {
                        this.getTweet();
                    }
                    this.props.setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    });
                }
        });
    }
    reTweet(text) {
        let body = {
            text : text,
            tweet_id: this.state.data._id
        }
        axios.post('/api/tweet/retweet', body)
            .then(resp => {
                if(resp.data.success) {
                    this.getTweet();
                    this.props.setMessage({
                        msg: resp.data.msg,
                        name: 'success'
                    });
                    setTimeout(() => notifyFollowers(this.props.user.id), 500);
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
       bookmarkTweet: payload => dispatch(bookmarkTweet(payload)),
       setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tweet);