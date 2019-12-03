import React from 'react';
import { connect } from 'react-redux';

import LeftNav from '../../components/leftnav/leftnav';
import Messages from './../messages/messages';
import { Switch, Route, Redirect } from 'react-router-dom';
import NewsFeed from './../newsfeed/newsfeed';
import TweetView from './../tweet-view/tweet-view';
import config from '../../../config/app-config';
import Search from './../search/search';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_message: false
        }
        config.socket.emit("openSocket", this.props.user.id);
        config.listen(config.socket, this.showNotification);
    }
    showNotification = (message) => {
        alert("Notification" + message);
        this.setState({
            new_message: true
        })
    }
    reset = () => {
        this.setState({
            new_message: false
        })
    }
    render() {

        return (
            <div className="t-app-container">
                <LeftNav new_message={this.state.new_message} reset={this.reset} />
                <div className="t-main-container">
                    <div className="t-main-content">
                        <Switch>
                            {/* ADD ROUTES HERE */}
                            <Route exact path="/ui/" render={() => (
                                <Redirect to="/ui/newsfeed" />
                            )} />
                            <Route path="/ui/newsfeed" component={NewsFeed} />
                            <Route path="/ui/messages" component={Messages} />
                            <Route path="/ui/tweet/:tweet_id" component={TweetView} />
                        </Switch>
                    </div>
                </div>
                {window.location.pathname.includes('/ui/messages') ? (<div className="t-container-border" style={{padding : '3rem'}}></div>) : (<Search />)}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user : state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);