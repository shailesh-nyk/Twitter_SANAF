
import React from 'react';
import config from '../../../config/app-config';
import { Link } from 'react-router-dom';

class Comment extends React.Component { 
    constructor(props) {
        super(props);
    }
    render() {
        return ( 
            <div className="t-tweet-container t-comment-container">
                <div>
                    <img class="t-tweet-avatar" style={{width: '50px', height: '50px'}} src={config.image_server + this.props.data.user.avatar}/>
                </div>
                <div class="t-tweet-right">
                    <div>
                        <Link className="t-profile-link t-primary-bold" to={'/ui/userprofile/' + this.props.data.user._id} >{this.props.data.user.name}</Link>
                        <span className="t-secondary"> @{this.props.data.user.handle} </span>
                        <span className="t-secondary" style={{marginLeft: "40px"}}> {this.props.data.timeElapsed}</span>
                    </div>
                    <div>
                        <p>{this.props.data.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;