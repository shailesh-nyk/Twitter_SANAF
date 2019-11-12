import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import ConversationHead from './../../components/conversationhead/conversationhead';
import Conversation from './../../components/conversation/conversation';


class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        };
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
            },
            {
                name: 'Clojure',
                year: 2007
            },
            {
                name: 'Elm',
                year: 2012
            },
            {
                name: 'Go',
                year: 2009
            },
            {
                name: 'Haskell',
                year: 1990
            },
            {
                name: 'Java',
                year: 1995
            },
            {
                name: 'Javascript',
                year: 1995
            },
            {
                name: 'Perl',
                year: 1987
            },
            {
                name: 'PHP',
                year: 1995
            },
            {
                name: 'Python',
                year: 1991
            },
            {
                name: 'Ruby',
                year: 1995
            },
            {
                name: 'Scala',
                year: 2003
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

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        var that = this;
        this.setState({
            suggestions: that.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search for people',
            value,
            onChange: this.onChange
        };
        return (
            <div className="row t-messages-div">
                <div className="col-6 border overflow-allow">
                    <div className="p-1 ">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                        />
                    </div>
                    <ConversationHead query={this.state.value} />
                </div>
                <div className="col-6 border">
                    <Conversation />
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