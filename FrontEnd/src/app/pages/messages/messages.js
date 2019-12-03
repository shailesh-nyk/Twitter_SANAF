import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import ConversationHead from './../../components/conversationhead/conversationhead';
import Conversation from './../../components/conversation/conversation';
import UserSearch from './../../components/userSearch-modal/userSearch-modal';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            head: '',
        };
    }
    getSuggestions = value => {
        const languages = [
            // {
            //     name: 'C',
            //     year: 1972
            // },
            // {
            //     name: 'C#',
            //     year: 2000
            // },
            // {
            //     name: 'C++',
            //     year: 1983
            // }
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

    changeSelectedHead = (selHead) => {
        this.setState({
            head: selHead
        })
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search for people',
            value,
            onChange: this.onChange
        };
        return (
            <div>
                <div className="t-topnav-container">
                      <div class="d-flex justify-content-between align-items-center" style={{width: "47%"}}>
                            <div class="mr-auto bd-highlight t-primary-bold t-medium-text">
                                Messages
                            </div>
                            <div class="bd-highlight">
                                <span className="t-userSearch" data-toggle="modal" data-target="#userSearchModal" onClick={(e) => e.stopPropagation()}>
                                    <i class="fas fa-plus-circle" style={{ fontSize: "larger" }} onClick={this.handleClick} id="newConversation" />
                                </span>
                            </div>
                      </div>
                </div>
                <div className="row">
                    <div className="d-flex flex-column col-6 overflow-allow t-no-padding">
                        <div className="p-1">
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}
                            />
                        </div>
                        <div style={{height: "calc(100vh - 137px)", overflow: "auto"}}>
                           <ConversationHead query={this.state.value} changeHead={this.changeSelectedHead} />
                        </div>
                    </div>
                    <div className="col-6" style={{height: "calc(100vh - 66px)", overflow: "auto"}}>
                        <Conversation query={this.state.head} />
                    </div>
                    <UserSearch />
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
export default connect(mapStateToProps, mapDispatchToProps)(Messages);