import React from 'react';
import { connect } from 'react-redux';
import LeftNav from '../../components/leftnav/leftnav';
import TopNav from '../../components/topnav/topnav';
import Messages from './../messages/messages';
import { Switch, Route, Redirect } from 'react-router-dom';
import NewsFeed from './../newsfeed/newsfeed';
import TweetView from './../tweet-view/tweet-view';
import config from '../../../config/app-config';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_message: false
        }
        config.socket.emit("openSocket", "userid"); // send the actual user id
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
                    <TopNav />
                    <div className="t-main-content">
                        <Switch>
                            {/* ADD ROUTES HERE */}
                            <Route exact path="/ui/" render={() => (
                                <Redirect to="/ui/newsfeed" />
                            )} />
                            <Route path="/ui/newsfeed" component={NewsFeed} />
                            <Route path="/ui/messages" component={Messages} />
                            <Route path="/ui/tweet" component={TweetView} />
                        </Switch>
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
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);