import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions/util-action';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';

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
            }
        }
    }
    render() {
        return(
            <div>
                <div className="t-topnav-container">
                    ADD HEADER HERE
                </div>
                <Tweet data={this.state.tweet}/>
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
       setMessage: payload => dispatch(setMessage(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);