
import React from 'react';
import config from '../../../config/app-config';
import { connect } from 'react-redux';
import { postTweet } from './../../../redux/actions/tweet-action';
import axios from 'axios';
import { setMessage } from './../../../redux/actions/util-action';

class TweetModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.state = {
            defaultText : "What's happening?",
            tweetText1 : "",
            tweetImage1 : null,
            listening: false
        }
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
    render() {
        return ( 
            <div class="modal fade" id="tweetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content t-dark-container">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Post a Tweet</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body t-tweet-comment-modal">
                    <div className="t-nf-container">
                        <div> 
                            <img class="t-tweet-avatar" src={config.image_server + this.props.user.avatar}/>
                        </div>
                        <div className="t-tweet-right">
                            <div>
                                <textarea maxLength="280" className="t-textbox form-control" onChange={this.handleChange} id="text1"
                                    placeholder= {this.state.defaultText } value = {this.state.tweetText1}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                        <div class='t-create-tweet-action'>
                                <label for="tweetImage1">
                                    <i class="fa fa-picture-o fa-lg t-icon" style={this.state.tweetImage1 ? {color: "#00acee" } : {}}></i> 
                                    <input name="file-to-upload" className="t-file-input" onChange={this.fileHandler} id="tweetImage1" type="file" accept="image/*" />
                                </label>
                               
                        </div>
                        <i title="Talk to tweet" class="fas fa-microphone  t-icon" style={this.state.listening ? {color:"red"} : {color:"white"}} onClick={() => this.speech()}></i>
                        <span className="t-small-text"> {280 - this.state.tweetText1.length} characters left </span>
                        <button className="btn btn-primary" data-dismiss="modal" disabled= { this.state.tweetText1=="" &&  this.state.tweetImage1== null ? true : false}
                                    onClick = {this.createTweet} > Tweet
                        </button>
                </div>
              </div>
            </div>
          </div>    
        )
    }
    createTweet = () => {
        if(this.state.tweetImage1) {
            const file = new FormData();
            file.append('file-to-upload', this.state.tweetImage1);
            axios.post(config.image_server, file, { withCredentials: false })
            .then(resp => {
                if(resp.data.message.includes("succesfully")) {
                    this.props.postTweet({
                        user: this.props.user.id,
                        text: this.state.tweetText1,
                        image: resp.data.fileName
                    })
                    this.setState( { tweetText1:"", tweetImage1: null });
                } else {
                    this.props.setMessage({
                        msg: "Image upload failed! Try again",
                        name: 'danger'
                    })
                    this.setState( { tweetText1:"", tweetImage1: null });
                }
            }, err => {
                this.props.setMessage({
                    msg: "Image upload failed! Try again",
                    name: 'danger'
                })
                this.setState( { tweetText1:"", tweetImage1: null });
            })
            .catch(err => {
                this.props.setMessage({
                    msg: "Image upload failed! Try again",
                    name: 'danger'
                })
                this.setState( { tweetText1:"", tweetImage1: null });
            })
        } else {
            this.props.postTweet({
                user: this.props.user.id,
                text: this.state.tweetText1,
            })
            this.setState( { tweetText1:"", tweetImage1: null });
        }
    }
    handleChange = (event) => {
        this.setState({ tweetText1: event.target.value });
    }
    fileHandler = (event) => {
        this.setState({ tweetImage1: event.target.files[0] });
    }  
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        postTweet: (payload) => dispatch(postTweet(payload)),
        setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TweetModal);