import React from 'react';
import { connect } from 'react-redux';
import { setMessage } from '../../../redux/actions/util-action';
import Tweet from './../../components/tweet/tweet';
import config from '../../../config/app-config';

class NewsFeed extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            //Dummy tweet
            tweet : {
                image: 'public/images/tweets/5dca69b394399426a4a77bb1.png',
                likes: 0,
                retweetCount: 0,
                parent_id: null,
                _id: "5dca69b394399426a4a77bb1",
                user: {
                       "_id": "5dca4f4de9a22e4b5c966d34",
                        "name": "James Franco",
                        "handle": "jfranco123",
                        "avatar": "public/images/users/5dca4f4de9a22e4b5c966d34.png"
                },
                text: "Hey! This is my first tweet",
                comments: [],
                postedOn: "2019-11-12T08:13:39.495Z",

            }
        }
    }
    render() {
        return(
            <div>
                <h2 style={{textAlign: 'center'}}>add NEWS FEED content here</h2>
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