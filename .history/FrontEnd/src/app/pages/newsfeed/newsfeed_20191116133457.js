import React from 'react';
import { connect } from 'react-redux';
import { newsfeed } from '../../../redux/actions/util-action';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';
import axios from 'axios';

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet : {
                "_id":"5dcb14f841a1663e90a9d2f4",
                "image":'public/images/tweets/5dca69b394399426a4a77bb1.png',
                "likes":[   ],
                "retweetCount":[],
                "parent_id":null,
                "user":{
                    "_id": "5dca4f4de9a22e4b5c966d34",
                     "name": "James Franco",
                     "handle": "jfranco123",
                     "avatar": "public/images/users/5dca4f4de9a22e4b5c966d34.png"
                },
                "text":"Hey! This is my second tweet",
                "comments":[],
                "postedOn":"2019-11-12T20:24:24.571Z", 
                "timeElapsed": "20 mins ago"
            },
            newsFeed : null,
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
        axios.get(config.base + 'user/newsFeed')
            .then(resp => {
                if(resp.data.success) {
                    console.log("resp is ",resp);
                    if(resp.data.success){
                        this.setState({newsFeed:resp.data.payload});
                        this.props.setNewsFeed(resp.data.payload);
                    }
                } 
            });
    }

    createTweet = () => {
        console.log("create tweet")
        this.setState({tweetText:"",tweetImage:null})
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
        return (<div className="t-wh-container">
            <div className="t-top-nav" >Home</div>
            <div className="t-top-nav">
                Messages
                <label for="sendMessage">
                    <i class="fa fa-envelope-o t-favicon"></i>
                    <input type="button" className="t-file-input" id="sendMessage" data-toggle="modal" data-target="#exampleModal"/>  
                </label>
                    {/* MODAL CODE */}
            </div>
            <div className="t-nf-container">
                <div className="t-text-container" >    
                    <img className="t-profile-img" src={config.base + this.state.tweet.user.avatar}></img>
                    <input className="t-textbox form-control" onChange={this.handleChange} type="text" id="text"
                       placeholder= {this.state.defaultText } value = {this.state.tweetText}/>
                </div>
                <div className="t-tweet-right">
                <label for="tweetImage">
                    <i class="fa fa-picture-o fa-lg t-favicon"></i> 
                    <input className="t-file-input" onChange={this.fileHandler} id="tweetImage" type="file" accept="image/*" />
                </label>
                <button className="t-rounded-button" disabled= { this.state.tweetText=="" &&  this.state.tweetImage== null ? true : false}
                    onClick = {this.createTweet} >Tweet</button>
                </div>
            </div>
            { this.state.newsFeed && this.state.newsFeed.map( tweet => {
                return <Tweet data={tweet}/>
            })}
            <div class="modal t-modal" id="exampleModal" aria-labelledby="exampleModalLabel">
                        <div class="modal-dialog" >
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setNewsFeed: payload => dispatch(newsfeed(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);