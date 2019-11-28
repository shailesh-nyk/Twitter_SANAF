import React from 'react';
import { connect } from 'react-redux';
import LeftNav from '../../components/leftnav/leftnav';
import Messages from './../messages/messages';
import { Switch, Route, Redirect } from 'react-router-dom';
import NewsFeed from './../newsfeed/newsfeed';
import TweetView from './../tweet-view/tweet-view';
import config from '../../../config/app-config';
import Search from './../search/search';
import BookMarks from './../bookmarks/bookmarks';
import { ToastsContainer, ToastsStore,ToastsContainerPosition } from 'react-toasts';

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
        let audio = new Audio("https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/water_droplet_2.mp3");
        audio.play();
        ToastsStore.info(message);
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
                            <Route path="/ui/bookmark" component={BookMarks} />
                        </Switch>
                    </div>
                </div>
                {window.location.pathname.includes('/ui/messages') ? (<div className="t-container-border" style={{ padding: '3rem' }}></div>) : (<Search />)}
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);