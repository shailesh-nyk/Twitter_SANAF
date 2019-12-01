
import React from 'react';
import config from '../../../config/app-config';
import { connect } from 'react-redux';

class CommentModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            data: this.props.data,
            currentUser: "Shailesh"
        })
    }
    render() {
        return ( 
            <div class="modal fade" id={"commentModal"+this.state.data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <img class="t-tweet-avatar" src={config.base + this.state.data.userId.avatar}/>
                            </div>
                            <div class="t-tweet-right">
                                <div>
                                    <span className="t-primary-bold"> {this.state.data.userId.name} </span>
                                    <span className="t-secondary"> @{this.state.data.userId.handle}</span>
                                </div>
                                <div>
                                    <p>{this.state.data.text}</p>
                                </div>
                            </div>
                    </div>
                    <div className="t-tweet-container t-small-text">
                            <div class="t-vertical-line">
                                <div></div>
                            </div>
                            <div class="t-tweet-right t-secondary">
                                 Replying to @{this.state.data.userId.handle}
                            </div>
                    </div>
                    <div className="t-tweet-container">
                            <div>
                                <img class="t-tweet-avatar" src={config.base + this.props.user.avatar}/>
                            </div>
                            <div class="t-tweet-right">
                                <textarea id="comment-text" className="t-dark-container t-comment-textarea" placeholder="Type your comment here" required/>
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
        let text = document.getElementById("comment-text").value;
        if(text) {
            this.props.postComment(text);
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, null)(CommentModal);