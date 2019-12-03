import React from 'react';
import { connect } from 'react-redux';
import LeftNav from '../../components/leftnav/leftnav';
import Messages from './../messages/messages';
import { Switch, Route, Redirect } from 'react-router-dom';
import NewsFeed from './../newsfeed/newsfeed';
import TweetView from './../tweet-view/tweet-view';
import config from '../../../config/app-config';
import Search from './../search/search';


import Profile from '../../components/Profile/Profile'
import BookMarks from './../bookmarks/bookmarks';
import HashTagView from './../hashtag/hashtag';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import List from './../list/list';
import ListView from './../list-view/list-view';
import PropTypes from "prop-types";
import Profile_Other from '../../components/Profile/Profile_Other';
import { getNewsFeed } from './../../../redux/actions/newsfeed-action';



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_message: false
        }
        config.socket.emit("openSocket", this.props.user.id);
        config.listen(config.socket, this.showNotification);
        config.listenNewsfeed(config.socket, this.reloadNewsFeed);
    }
    componentDidMount(){
        if (!this.props.auth.isAuthenticated) {
            console.log("Main....Compo", this.props.auth.isAuthenticated);
            console.log(this.props.history);
            this.props.history.push("/login");
        }
    }


    showNotification = (message) => {
        let audio = new Audio("https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/water_droplet_2.mp3");
        audio.play();
        ToastsStore.info("New message recieved");
        this.setState({
            new_message: true
        })
    }
    reloadNewsFeed = () => {
        let audio = new Audio("https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/bell_ring.mp3");
        audio.play();
        this.props.getNewsFeed();
        ToastsStore.info("Feed reloaded");
    }
    reset = () => {
        this.setState({
            new_message: false
        })
    }
    redirectHelper = (props) => {
        this.props.history.push(props);
    }
    shouldRenderSearchPage = () => {
        if (window.location.pathname.includes('/ui/messages')) {
            return <div className="t-container-border" style={{ padding: '3rem' }}></div>
        }
        else {
            return <Search redirect={this.redirectHelper} />
        }
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
                            <Route path="/ui/profile" component={Profile} />
                            <Route path="/ui/userprofile/:profile_id" component={Profile_Other} />

                            <Route path="/ui/messages" component={Messages} />
                            <Route path="/ui/tweet/:tweet_id" component={TweetView} />
                            <Route path="/ui/bookmark" component={BookMarks} />
                            <Route path="/ui/hashtag/:hashtag_id" component={HashTagView} />
                            <Route path="/ui/list" component={List} />
                            <Route path="/ui/listview/:list_id" component={ListView} />
                        </Switch>
                    </div>
                </div>
                {this.shouldRenderSearchPage()}
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
            </div>
        )
    }
}

Main.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getNewsFeed: () => dispatch(getNewsFeed()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);