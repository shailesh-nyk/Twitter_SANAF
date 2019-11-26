import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions/util-action';
import Tweet from '../../components/tweet/tweet';
import config from '../../../config/app-config';
import axios from 'axios';
import Comment from './../../components/comment/comment';
import { setTweetViewData } from '../../../redux/actions/newsfeed-action';

class TweetView extends React.Component { 
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if(!this.props.data) {
            this.getTweet();
        } 
    }
    render() {
        if(this.props.data) {
            return(
                <div>
                    <div className="t-topnav-container">
                        <i class="fas fa-arrow-left t-icon"></i> <span className="t-left-margin-24 t-primary-bold">TWEET</span>
                    </div>
                    <div className="t-tweet-view-container">
                        <Tweet tweet={this.props.data}/>
                    </div>
                    <div className="t-comments-view-container">
                        {this.props.data.comments.map(comment => {
                            return (
                                <Comment data={comment}/>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div>no data</div>
            )
        }
      
    }
    getTweet() {
        axios.get('/api/tweet', {
            params: {
                id: this.props.match.params.tweet_id
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