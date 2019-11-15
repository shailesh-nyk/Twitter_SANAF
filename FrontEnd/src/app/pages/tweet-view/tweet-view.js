import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions/util-action';
import Tweet from '../../components/tweet/tweet';
import config from '../../../config/app-config';
import axios from 'axios';
import Comment from './../../components/comment/comment';

class TweetView extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "Shailesh"
        }
    }
    componentWillMount() {
        this.getTweet();
    }
    render() {
        if(this.state.data) {
            return(
                <div>
                    <div className="t-topnav-container">
                        <i class="fas fa-arrow-left t-icon"></i> <span className="t-left-margin-24 t-primary-bold">TWEET</span>
                    </div>
                    <div className="t-tweet-view-container">
                        <Tweet data={this.state.data}/>
                    </div>
                    <div className="t-comments-view-container">
                        {this.state.data.comments.map(comment => {
                            return (
                                <Comment data={comment}/>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div>kefdskghsg</div>
            )
        }
      
    }
    getTweet() {
        axios.get(config.api_host + '/tweet', {
            params: {
                id: this.props.match.params.tweet_id
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
const mapStateToProps = state => {
    return {
    }   
}
const mapDispatchToProps = dispatch => {
    return {
       setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TweetView);