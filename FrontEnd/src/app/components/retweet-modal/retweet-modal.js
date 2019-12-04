
import React from 'react';
import config from '../../../config/app-config';
import Retweet from '../retweet/retweet';
import { connect } from 'react-redux';

class RetweetModal extends React.Component { 
    constructor(props) {
        super(props);
        this.state ={
            text: "",
            isOpen: false
        }   
        this.isOpen = this.isOpen.bind(this);
    }
    componentDidMount(){
        let id = "#retweetModal" + this.props.data._id;
        let that = this;
        window.$(id).on("show.bs.modal", function(e) {
            that.isOpen(true);
        })
        window.$(id).on("hide.bs.modal", function(e) {
            that.isOpen(false);
        })
    }
    isOpen(bool) {
        this.setState({
            isOpen: bool
        })
    }
    render() {
        return ( 
            <div class="modal fade" id={"retweetModal" + this.props.data._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <img class="t-tweet-avatar" src={config.image_server + this.props.user.avatar}/>
                            </div>
                            <div class="t-tweet-right">
                                <textarea className="t-dark-container t-comment-textarea" placeholder="Retweet with a comment" required
                                value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}/>
                            </div>
                    </div>
                    <div>
                        <span class="t-secondary"> <i class="fas fa-retweet"></i> retweeting</span>
                        <Retweet retweetID={this.props.data._id} isOpen={this.state.isOpen}/>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" data-dismiss="modal" class="btn btn-primary" onClick={() => this.reTweet()}>Retweet</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
    reTweet() {
        this.props.reTweet(this.state.text);
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, null)(RetweetModal);