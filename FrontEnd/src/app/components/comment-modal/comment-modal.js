
import React from 'react';
import config from '../../../config/app-config';
import { connect } from 'react-redux';

class CommentModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            text: ""
        })
    }
    render() {
        return ( 
            <div class="modal fade" id={"commentModal"+this.props.data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content t-dark-container">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Comment on Tweet</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body t-tweet-comment-modal">
                    <div className="t-tweet-container">
                            <div>
                                <img class="t-tweet-avatar" src={config.image_server + this.props.data.userId.avatar}/>
                            </div>
                            <div class="t-tweet-right">
                                <div>
                                    <span className="t-primary-bold"> {this.props.data.userId.name} </span>
                                    <span className="t-secondary"> @{this.props.data.userId.handle}</span>
                                </div>
                                <div>
                                    <p>{this.props.data.text}</p>
                                </div>
                            </div>
                    </div>
                    <div className="t-tweet-container t-small-text">
                            <div class="t-vertical-line">
                                <div></div>
                            </div>
                            <div class="t-tweet-right t-secondary">
                                 Replying to @{this.props.data.userId.handle}
                            </div>
                    </div>
                    <div className="t-tweet-container">
                            <div>
                                <img class="t-tweet-avatar" src={config.image_server + this.props.user.avatar}/>
                            </div>
                            <div class="t-tweet-right">
                                <textarea className="t-dark-container t-comment-textarea" placeholder="Type your comment here" value={this.state.text} 
                                onChange={(e) => this.setState({ text: e.target.value})} required/>
                            </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" data-dismiss="modal" class="btn btn-primary" onClick={() => this.postComment()}>Reply</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
    postComment() {
        if(this.state.text != "") {
            this.props.postComment(this.state.text);
        }
        this.setState({
            text : ""
        })
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, null)(CommentModal);