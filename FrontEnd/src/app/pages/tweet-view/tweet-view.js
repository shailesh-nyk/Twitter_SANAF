import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions/util-action';
import Tweet from '../../components/tweet/tweet';
import config from '../../../config/app-config';
import axios from 'axios';
import Comment from './../../components/comment/comment';
import { setTweetViewData } from '../../../redux/actions/newsfeed-action';
import ContainerLoader from './../../components/container-loader/container-loader';

class TweetView extends React.Component { 
    constructor(props) {
        super(props);
        this.getTweet = this.getTweet.bind(this);
    }
    componentWillMount() {
        if(!this.props.data || this.props.data._id != this.props.match.params.tweet_id) {
            this.getTweet(this.props.match.params.tweet_id);
        }   
    }
    componentWillReceiveProps(next) {
        if (next.match.params.tweet_id !== this.props.match.params.tweet_id) {
            this.getTweet(next.match.params.tweet_id);
        }   
    }
    render() {
        
        if(this.props.data) {
            return(
                <div>
                    <div className="t-topnav-container">
                        <i class="fas fa-arrow-left t-icon" onClick={() => this.goBack()}></i> <span className="t-left-margin-24 t-primary-bold">TWEET</span>
                    </div>
                    <div className="t-tweet-view-container">
                        <Tweet tweet={this.props.data} updateTweetView={this.getTweet}/>
                    </div>
                    <div className="t-comments-view-container">
                        {this.props.data.comments.map(comment => {
                            return (
                                <Comment data={comment}/>
                            )
                        })}
                        {this.props.data.comments.length == 0 ? (
                            <div class="t-secondary" style={{textAlign:"center", marginTop: "24px"}}>No comments on this tweet</div>
                        ) : (null)}
                    </div>
                </div>
            )
        } else {
            return (
                <ContainerLoader/>
            )
        }
      
    }
    goBack() {
        if(this.props.location.state && this.props.location.state.prev) {
            this.props.history.push(this.props.location.state.prev);
        } else {
            this.props.history.goBack();
        }
    }
    getTweet(tweet_id) {
        axios.get('/api/tweet', {
            params: {
                id: tweet_id
            }
        })
        .then(resp => {
            if(resp.data.success) {
                this.props.setTweetViewData(resp.data.payload);
            } 
        });
    }   
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        data : state.newsFeedReducer.tweetViewData
    }   
}
const mapDispatchToProps = dispatch => {
    return {
       setMessage: payload => dispatch(setMessage(payload)),
       setTweetViewData: payload => dispatch(setTweetViewData(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TweetView);