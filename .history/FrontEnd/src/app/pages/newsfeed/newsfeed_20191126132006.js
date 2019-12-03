import React from 'react';
import { connect } from 'react-redux';
import { newsfeed } from '../../../redux/actions/util-action';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import axios from 'axios';
import { getNewsFeed } from './../../../redux/actions/newsfeed-action';

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
        let user = {
            name : this.state.tweet.user.name,
            handle : this.state.tweet.user.handle
        }
        const body = new FormData();
        body.append('user',user);
        body.append('text',this.state.tweetText);
        body.append('image',this.state.tweetImage); 
        // axios.post(config.api_host + '/tweet/', body)
        //     .then(resp => {
        //         if(resp.data.success) {
        //             console.log("resp is ",JSON.stringify(resp))
        //         } 
        //     });
    }

    handleChange = (event) => {
        this.setState({ tweetText: event.target.value });
    }
    
    render() {
        return (
        <div className="t-wh-container">
            <div className="t-top-nav" >Home</div>
            <div className="t-nf-container">
                <div className="t-text-container" > 
                    {/* change image with current user image    */}
                    <img className="t-profile-img" src={config.base + 'public/images/tweets/5dca69b394399426a4a77bb1.png'}></img>
                    <input className="t-textbox form-control" onChange={this.handleChange} type="text" id="text"
                       placeholder= {this.state.defaultText } value = {this.state.tweetText}/>
                </div>
                <div className="t-tweet-right">
                <label for="tweetImage">
                    <i class="fa fa-picture-o fa-lg t-favicon"></i> 
                    <input className="t-file-input" onChange={this.fileHandler} id="tweetImage" type="file" accept="image/*" />
                </label>
                <button className="t-rounded-button" disabled= { this.state.tweetText=="" &&  this.state.tweetImage== null ? true : false}
                    onClick = {this.createTweet} > Tweet</button>
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
        getNewsFeed: () => dispatch(getNewsFeed())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);