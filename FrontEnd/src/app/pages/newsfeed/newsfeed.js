import React from 'react';
import { connect } from 'react-redux';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import axios from 'axios';
import { getNewsFeed } from './../../../redux/actions/newsfeed-action';
import { postTweet } from './../../../redux/actions/tweet-action';
import { setMessage } from './../../../redux/actions/util-action';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultText : "What's happening?",
            tweetText : "",
            tweetImage : null,
            listening: false
        }
    }
    componentWillMount(){
        console.log("in will mount")
        this.props.getNewsFeed();
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
                    <textarea maxLength="280" className="t-textbox form-control" onChange={this.handleChange} id="text"
                       placeholder= {this.state.defaultText } value = {this.state.tweetText}/>
                    </div>
                    <div class='t-create-tweet-action'>
                        <label for="tweetImage">
                            <i class="fa fa-picture-o fa-lg t-icon" style={this.state.tweetImage ? {color: "#00acee" } : {}}></i> 
                            <input name="file-to-upload" className="t-file-input" onChange={this.fileHandler} id="tweetImage" type="file" accept="image/*" />
                        </label>
                        <i title="Talk to tweet" class="fas fa-microphone  t-icon" style={this.state.listening ? {color:"red"} : {color:"white"}} onClick={() => this.speech()}></i>
                        <span className="t-small-text"> {280 - this.state.tweetText.length} characters left </span>
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
    speech() {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            const recognition = new window.SpeechRecognition();
            recognition.interimResults = true;
            recognition.onresult = (event) => {
            if(event.results[0].isFinal) {
                this.setState({
                    tweetText: event.results[0][0].transcript,
                    listening: false
                    })
            } else {
                this.setState({
                    tweetText: event.results[0][0].transcript
                    })
            }
        }
        recognition.start();
        this.setState({
            listening: true
        })
    }
    createTweet = () => {
        if(this.state.tweetImage) {
            const file = new FormData();
            file.append('file-to-upload', this.state.tweetImage);
            axios.post(config.image_server, file, { withCredentials: false })
            .then(resp => {
                if(resp.data.message.includes("succesfully")) {
                    this.props.postTweet({
                        user: this.props.user.id,
                        text: this.state.tweetText,
                        image: resp.data.fileName
                    })
                    this.setState( { tweetText:"", tweetImage: null });
                } else {
                    this.props.setMessage({
                        msg: "Image upload failed! Try again",
                        name: 'danger'
                    })
                    this.setState( { tweetText:"", tweetImage: null });
                }
                this.setState( { tweetText:"", tweetImage: null });
            }, err => {
                this.props.setMessage({
                    msg: "Image upload failed! Try again",
                    name: 'danger'
                })
                this.setState( { tweetText:"", tweetImage: null });
            })
            .catch(err => {
                this.props.setMessage({
                    msg: "Image upload failed! Try again",
                    name: 'danger'
                })
                this.setState( { tweetText:"", tweetImage: null });
            })
        } else {
            this.props.postTweet({
                user: this.props.user.id,
                text: this.state.tweetText,
            })
            this.setState( { tweetText:"", tweetImage: null });
        }
        
    }

    handleChange = (event) => {
        this.setState({ tweetText: event.target.value });
    }
    fileHandler = (event) => {
        this.setState({ tweetImage: event.target.files[0] });
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
        postTweet: (payload) => dispatch(postTweet(payload)),
        setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);