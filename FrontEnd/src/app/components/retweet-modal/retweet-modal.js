
import React from 'react';
import config from '../../../config/app-config';
import Retweet from '../retweet/retweet';

class RetweetModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            data: this.props.data
        })
    }
    render() {
        return ( 
            <div class="modal fade" id={"retweetModal" + this.state.data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content t-dark-container">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Retweet</h5>
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
                                <textarea id="retweet-text" className="t-dark-container t-comment-textarea" placeholder="Retweet with a comment" required/>
                            </div>
                    </div>
                    <div className="t-tweet-container t-small-text">
                            <div class="t-vertical-line">
                                <div></div>
                            </div>
                            <div class="t-tweet-right t-secondary">
                                 Retweeting
                            </div>
                    </div>
                    <Retweet retweetID={this.state.data._id}/>  
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" onClick={() => this.reTweet()}>Retweet</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
    reTweet() {
        let text = document.getElementById("retweet-text").value;
        if(text) {
            this.props.reTweet(text);
        }
    }
}

export default RetweetModal;