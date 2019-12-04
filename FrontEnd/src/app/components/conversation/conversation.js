import React from 'react';
import { connect } from 'react-redux';
import { sendmessage, fetchConversationheads } from './../../../redux/actions/conversation-action';
import config from '../../../config/app-config';

class conversation extends React.Component {
    constructor(props) {
        super(props);
        config.listen(config.socket, this.reloadConversation);
    }
    reloadConversation = () => {
        setTimeout(() => this.props.fetchConversationheads(this.props.user.id), 500);
    }
    renderMessages = (messages) => {
        if (messages) {
            return messages.map((message) => {
                let alignItem = "align-items-end";
                let dateStyle = { fontSize: "xx-small", float: "right" };
                let messageClass = "list-group-item t-font list-group-item-action flex-column t-conversationhead-btn ";
                if (message.sender_id._id === this.props.query) {
                    alignItem = "align-items-start";
                    dateStyle.float = "none";
                }
                return (
                    <button className={messageClass + alignItem}>
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">{message.text}</h6>
                        </div>
                        <small style={dateStyle}>{new Date(message.sent_at).toTimeString().split(" ")[0]}</small>
                    </button>
                )
            });
        }
    }

    renderStartConversationInfo = () => {
        return (
            <div class="container " style={{ paddingTop: "45%" }}>
                <div class="row h-100 justify-content-center align-items-center">
                    <span>You don’t have a message selected</span>
                </div>
                <div class="row h-100 justify-content-center align-items-center">
                    <span >Choose one from your existing messages, or start a new one.</span>
                </div>
                <a href="" onClick={(e) => { e.preventDefault(); window.$("#newConversation").click() }} role="button" data-focusable="true" class="row h-100 justify-content-center align-items-center">
                    <div>
                        <span >
                            <span>New message</span>
                        </span>
                    </div>
                </a>
            </div>
        )
    }
    renderUserName = (user) => {
        if (user) {
            return (
                <div className="p-3 t-container-border" style={{ position: "absolute", zIndex: "1", width: "90%", backgroundColor: "#15202b" }}>
                    <h5>{user.name}</h5>
                    <small>@{user.handle}</small>
                    <i class="fas fa-info-circle" style={{ float: "right" }}></i>
                </div>
            )
        }


    }
    getConversation = (theOtherUserId) => {
        let user_message = { user: null, messages: null };
        for (let i = 0; i < this.props.conversationheads.length; i++) {
            for (let j = 0; j < this.props.conversationheads[i].users.length; j++) {
                if (this.props.conversationheads[i].users[j]._id === theOtherUserId) {
                    user_message.user = this.props.conversationheads[i].users[j];
                    user_message.messages = this.props.conversationheads[i].messages;
                    return user_message;
                }
            }
        }
    }

    checkEnterKeyPress = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.sendMessage();
        }
    }
    sendMessage = () => {
        let that = this;
        let user = this.props.user.id;
        let message = document.getElementById("inpMessage").value;
        let message_payload = {
            users: [user, that.props.query],
            message
        }
        document.getElementById("inpMessage").value = "";
        this.props.sendmessage(message_payload);
    }

    render() {
        if (this.props.conversationheads) {
            var user_message = this.getConversation(this.props.query);
        }
        return (
            <div style={{ height: "100%" }}>
                {user_message && this.renderUserName(user_message.user)}
                <div className="overflow-auto" style={{ height: "100%", paddingTop: "95px", paddingBottom: "60px" }}>
                    {user_message == null ? this.renderStartConversationInfo() : this.renderMessages(user_message.messages)}
                </div>
                {user_message && <div class="input-group p-2 bottom" style={{ backgroundColor: "#15202b", zIndex: "1" }}>
                    <input type="text" class="form-control" onKeyUp={this.checkEnterKeyPress} id="inpMessage"
                        placeholder="Enter message" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={this.sendMessage}>
                            <i class="far fa-paper-plane"></i>
                        </button>
                    </div>
                </div>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        conversationheads: state.conversationReducer.conversationheads,
        user: state.auth.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendmessage: (message_payload) => dispatch(sendmessage(message_payload)),
        fetchConversationheads: (id) => dispatch(fetchConversationheads(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(conversation)
