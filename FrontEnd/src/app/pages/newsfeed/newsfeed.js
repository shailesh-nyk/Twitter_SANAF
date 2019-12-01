import React from 'react';
import { connect } from 'react-redux';
import { newsfeed } from '../../../redux/actions/util-action';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import axios from 'axios';
import { getNewsFeed } from './../../../redux/actions/newsfeed-action';
import { postTweet } from './../../../redux/actions/tweet-action';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultText : "What's happening?",
            tweetText : "",
            tweetImage : null
        }
    }

    fileHandler = (event) => {
        this.setState({ tweetImage: event.target.files[0] });
    }

    componentWillMount(){
        console.log("in will mount")
        this.props.getNewsFeed();
    }

    createTweet = () => {
        console.log("create tweet")
        this.setState( { tweetText:"", tweetImage: null });
        this.props.postTweet({
            user: this.props.user.id,
            text: this.state.tweetText
        })
        // const body = new FormData();
        // body.append('user',user);
        // body.append('text',this.state.tweetText);
        // body.append('image',this.state.tweetImage); 
    }

    handleChange = (event) => {
        this.setState({ tweetText: event.target.value });
    }
    
    render() {
        return (
        <div>
            <div className="t-topnav-container">Home</div>
            <div className="t-nf-container">
                <div> 
                    <img class="t-tweet-avatar" src={config.image_server + this.props.user.avatar}/>
                </div>
                <div className="t-tweet-right">
                    <div>
                        <textarea className="t-textbox form-control" onChange={this.handleChange} id="text"
                       placeholder= {this.state.defaultText } value = {this.state.tweetText}/>
                    </div>
                    <div class='t-create-tweet-action'>
                        <label for="tweetImage">
                            <i class="fa fa-picture-o fa-lg t-icon"></i> 
                            <input className="t-file-input" onChange={this.fileHandler} id="tweetImage" type="file" accept="image/*" />
                        </label>
                        <button className="btn btn-primary" disabled= { this.state.tweetText=="" &&  this.state.tweetImage== null ? true : false}
                            onClick = {this.createTweet} > Tweet
                        </button>
                    </div>
                </div>
            </div>
            { this.props.newsFeed && this.props.newsFeed.map( tweet => {
                return <Tweet tweet={tweet}/>
            })}
        </div>
        )
    }
       
}

const mapStateToProps = state => {
    return {
        newsFeed: state.newsFeedReducer.newsFeed,
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNewsFeed: () => dispatch(getNewsFeed()),
        postTweet: (payload) => dispatch(postTweet(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);