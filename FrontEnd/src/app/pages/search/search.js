import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import config from '../../../config/app-config';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            recommendations: [2]
        }
    }
    getSuggestions = value => {
        const languages = [
            {
                name: 'C',
                year: 1972
            },
            {
                name: 'C#',
                year: 2000
            },
            {
                name: 'C++',
                year: 1983
            }
        ];
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : languages.filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = (suggestion) => {
        return suggestion.name
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        var that = this;
        this.setState({
            suggestions: that.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    renderRecommendations = () => {
        let users = [
            {
                _id: '123',
                avatar: "no-dp.png",
                name: "asdasd",
                handle: "asdsadasd"
            },
            {
                _id: '123',
                avatar: "no-dp.png",
                name: "asdasd",
                handle: "asdsadasd"
            },
            {
                _id: '123',
                avatar: "no-dp.png",
                name: "asdasd",
                handle: "asdsadasd"
            }
        ]
        let ret = [];
        ret.push(<p className="list-group-item list-group-item-action t-recommendation-title"> Who to follow</p>);
        ret.push(users.map((user) => {
            return (
                <div onClick={this.handleHeadClick} data-id={user._id} class="t-recommendation d-flex p-2">
                    <img src={config.image_server + user.avatar} alt="Avatar" class="t-conversationhead-avatar" />
                    <div class="d-flex flex-column mx-2 px-2">
                        <span>{user.name}</span>
                        <small> @{user.handle} </small>
                    </div>
                    <div className="d-flex mr-auto mx-2 px-2">
                        <button className="btn t-btn-follow"> follow </button>
                    </div>
                </div>
            )
        }));                                                                                   
        ret.push(<p className="list-group-item list-group-item-action t-recommendation-footer" onClick={(e)=> e.target.style.display = "none"} data-toggle="collapse" data-target="#showMore"> Show more</p>);
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
        let users = [
            {
                _id: '123',
                avatar: "no-dp.png",
                name: "asdasd",
                handle: "asdsadasd"
            },
            {
                _id: '123',
                avatar: "no-dp.png",
                name: "asdasd",
                handle: "asdsadasd"
            },
            {
                _id: '123',
                avatar: "no-dp.png",
                name: "asdasd",
                handle: "asdsadasd"
            }
        ]
        return users.map((user) => {
            return (
                <div onClick={this.handleHeadClick} data-id={user._id} class="t-recommendation d-flex p-2">
                    <img src={config.image_server + user.avatar} alt="Avatar" class="t-conversationhead-avatar" />
                    <div class="d-flex flex-column mx-2 px-2">
                        <span>{user.name}</span>
                        <small> @{user.handle} </small>
                    </div>
                    <div className="d-flex mr-auto mx-2 px-2">
                        <button className="btn t-btn-follow"> follow </button>
                    </div>
                </div>
            )
        })

    }
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search Twitter',
            value,
            onChange: this.onChange
        };
        return (
            <div className="t-search-container">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
                {this.state.recommendations && this.renderRecommendations() }
                {this.state.recommendations && this.renderShowMore()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Search);