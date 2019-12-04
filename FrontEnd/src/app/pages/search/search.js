import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import config from '../../../config/app-config';
import { getRecommendation, handleSearch } from './../../../redux/actions/recommendation-action';
import { followUser } from './../../../redux/actions/user-action';
import { Redirect, Link } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        }
        this.props.getRecommendation(this.props.user.id);
    }
    getSuggestions = value => {
        if (this.props.searchResults) {
            let searchResults = this.props.searchResults;
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            return inputLength === 0 ? [] : searchResults.filter(result =>
                result.name.toLowerCase().slice(0, inputLength) === inputValue
            );
        }
    };
    getSuggestionValue = (suggestion) => {
        return suggestion.name
    }
    renderSuggestion(suggestion) {
        if (suggestion.hasOwnProperty('tweets')) {
            return this.renderHashtagSuggestion(suggestion);
        }
        else if (suggestion.hasOwnProperty('list')) {
            return this.renderListSuggestion(suggestion);
        }
        else {
            return this.renderUserSuggestion(suggestion);
        }
    }
    renderUserSuggestion(suggestion) {
        return (
            <div data-id={suggestion._id} class="d-flex align-items-center justify-content-between" onClick={(e) => { this.handleUserRedirect(e.currentTarget.dataset.id) }}>
                <div class="d-flex align-items-center">
                    <img src={config.image_server + suggestion.avatar} alt="Avatar" class="t-conversationhead-avatar mr-2 p-2" />
                    <div class="d-flex flex-column" style={{ "textDecoration": "none" }}>
                        <span>{suggestion.name}</span>
                        <small> @{suggestion.handle} </small>
                    </div>
                </div>
                <span class="badge badge-primary">user</span>
            </div>
        );
    }
    renderHashtagSuggestion(suggestion) {
        return (
            <div data-id={suggestion._id} data-name={suggestion.name} class="d-flex align-items-center" onClick={(e) => { this.handleHashtagRedirect(e.currentTarget.dataset) }}>
                <div class="d-flex flex-column p-2 t-margin-left">
                    <small>Trending in US</small>
                    <span className="t-medium-text t-primary-bold">#{suggestion.name}</span>
                    <small>{suggestion.tweets.length} Tweets</small>
                </div>
                <span class="badge badge-info">#tag</span>
            </div>
        );
    }
    renderListSuggestion(suggestion) {
        return (
            <div data-id={suggestion._id} data-name={suggestion.name} class="d-flex align-items-center justify-content-between" onClick={(e) => { this.handleListRedirect(e.currentTarget.dataset.id) }}>
                <div class="d-flex flex-column p-2">
                    <span className="t-medium-text">{suggestion.name}</span>
                    <small>{suggestion.description}</small>
                </div>
                <span class="badge badge-warning">list</span>
            </div>
        );
    }
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };
    onSuggestionsFetchRequested = ({ value }) => {
        this.props.handleSearch(value);
    };
    onSuggestionsClearRequested = () => {
    };
    handleUserRedirect = (id) => {
        this.props.redirect({ pathname: `/ui/userprofile/${id}` });
    }
    handleHashtagRedirect = (data) => {
        this.props.redirect({ pathname: `/ui/hashtag/${data.id}`, state: { hashtag: data.name } });
    }
    handleListRedirect = (id) => {
        this.props.redirect({ pathname: `/ui/listview/${id}` });
    }
    renderRecommendations = () => {
        let users = this.props.recommendation.slice(0, 2);
        let ret = [];
        ret.push(<p className="list-group-item list-group-item-action t-recommendation-title"> Who to follow</p>);
        ret.push(users.map((user) => {
            return (
                <div data-id={user._id} class="t-recommendation d-flex p-2 align-items-center">
                    <img src={config.image_server + user.avatar} alt="Avatar" class="t-conversationhead-avatar p-2" />
                    <div class="d-flex flex-column p-2">
                        <Link className="t-profile-link t-primary-bold" to={'/ui/userprofile/' + user._id} >{user.name}</Link>
                        <small> @{user.handle} </small>
                    </div>
                    <button className="btn t-btn-follow p-2" data-id={user._id} onClick={this.handleFollow}> Follow </button>
                </div>
            )
        }));
        ret.push(<p className="list-group-item list-group-item-action t-recommendation-footer" onClick={(e) => e.target.style.display = "none"} data-toggle="collapse" data-target="#showMore"> Show more</p>);
        return ret;
    }
    renderShowMore = () => {
        return (
            <div class="collapse" id="showMore">
                {this.renderShowMoreList()}
            </div>
        )
    }
    renderShowMoreList = () => {
        let users = this.props.recommendation.slice(5);
        return users.map((user) => {
            return (
                <div class="t-recommendation d-flex p-2 align-items-center">
                    <img src={config.image_server + user.avatar} alt="Avatar" class="t-conversationhead-avatar p-2" />
                    <div class="d-flex flex-column p-2">
                        <span>{user.name}</span>
                        <small> @{user.handle} </small>
                    </div>
                    <button className="btn t-btn-follow p-2" data-id={user._id} onClick={this.handleFollow}> Follow </button>
                </div>
            )
        })
    }
    handleFollow = (event) => {
        this.props.followUser(this.props.user.id, event.target.dataset.id);
    }
    render() {
        const { value } = this.state;
        const inputProps = {
            placeholder: 'Search Twitter',
            value,
            onChange: this.onChange
        };
        let searchResults = this.props.searchResults || [];
        return (
            <div className="t-search-container">
                <i class="fa fa-search t-search-icon" fa-lg></i>
                <Autosuggest
                    suggestions={searchResults}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion.bind(this)}
                    inputProps={inputProps}
                />
                <div className="t-rec-container rounded">
                    {this.props.recommendation && this.renderRecommendations()}
                    {this.props.recommendation && this.renderShowMore()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        recommendation: state.recommendationReducer.recommendation,
        searchResults: state.recommendationReducer.searchResults
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getRecommendation: (id) => dispatch(getRecommendation(id)),
        followUser: (id, target_id) => dispatch(followUser(id, target_id)),
        handleSearch: (query) => dispatch(handleSearch(query))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
