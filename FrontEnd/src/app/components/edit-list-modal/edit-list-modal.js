
import React from 'react';
import { connect } from 'react-redux';
import config from './../../../config/app-config';
import { removeUserFromList, addUserToList } from './../../../redux/actions/list-action';
import { handleSearch } from './../../../redux/actions/recommendation-action';
import Autosuggest from 'react-autosuggest';

class EditListModal extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            name: '',
            desc: '',
            isPublic: false
        }
    }
    componentDidMount() {
        this.setState( {
            name: this.props.data.name,
            desc: this.props.data.description,
            isPublic: this.props.data.isPublic
        })
    }
    componentWillReceiveProps(next) {
        if(next.data.name !== this.props.data.name) {
            this.setState( {
                name: next.data.name,
                desc: next.data.description,
                isPublic: next.data.isPublic
            })
        }
    }
    render() {
        const { value } = this.state;
        const inputProps = {
            placeholder: 'Search users to add',
            value,
            onChange: this.onChange
        };
        let searchResults = this.props.searchResults || [];
        return ( 
            <div class="modal fade" id="editListModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content t-dark-container">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Edit List</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={(e) => this.editList(e)}>
                <div class="modal-body">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                            <h2 class="mb-0 d-flex justify-content-between align-items-center">
                                <button class="btn btn-link collapsed" type="button" aria-expanded="false" data-toggle="collapse" data-target="#collapseTwo" aria-controls="collapseTwo" >
                                    Members
                                </button>
                                <Autosuggest
                                    suggestions={searchResults}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion.bind(this)}
                                    inputProps={inputProps}
                                />
                                <i className="fas fa-user-plus t-secondary"></i>
                            </h2>
                            </div>
                            <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body" style={{minHeight: "250px"}}>
                                {this.props.data.list.map( user => {
                                    return (
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <img style={{width:"50px", borderRadius: "60px"}} src={config.image_server + user.avatar}/>
                                                <div class="ml-3">
                                                    <span>{user.name}</span> <br/>
                                                    <span className="t-secondary t-small-text">@{user.handle}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="button" class="btn btn-danger btn-sm" onClick={() => this.removeUser(user._id)}>Remove</button>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Edit Details
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="create-list-name">Name:</label>
                                        <input type="name" class="form-control" required value={this.state.name}
                                         onChange={(e) => this.setState({ name: e.target.value })}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-list-desc">Description:</label>
                                        <input type="name" class="form-control" value={this.state.desc} 
                                         onChange={(e) => this.setState({ desc: e.target.value })}/>
                                    </div>
                                    <div class="form-group" style={{display:"flex"}}>
                                        <label style={{flex: "1"}} for="create-list-public">Make Public:</label>
                                        <input style={{flex: "1"}} type="checkbox" class="form-control" checked={this.state.isPublic}
                                        onChange={(e) => this.setState({ isPublic: e.target.checked })}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                    </div>
                 
                </div>
                <div class="modal-footer">
                  <button type="submit"  class="btn btn-primary">Save</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        )
    }
    editList(e) {
        e.preventDefault();
        let body = {
            name: this.state.name,
            description: this.state.desc,
            isPublic: this.state.isPublic,
            list_id: this.props.data._id
        }
        this.props.editList(body);
    }
    removeUser(id) {
        this.props.removeUserFromList({
            list_id: this.props.data._id,
            user_id: id
        })
    }
    onSuggestionsFetchRequested = ({ value }) => {
        this.props.handleSearch(value);
    };
    onSuggestionsClearRequested = () => {
    };
    getSuggestionValue = (suggestion) => {
        return suggestion.name
    }
    renderSuggestion(suggestion) {
        if (!suggestion.hasOwnProperty('tweets') && !suggestion.hasOwnProperty('list')) {
            return (
                <div data-id={suggestion._id} class="d-flex" onClick={(e) => { this.handleUserRedirect(e.currentTarget.dataset.id) }}>
                    <img src={config.image_server + suggestion.avatar} alt="Avatar" class="t-conversationhead-avatar t-margin-right" />
                    <div class="d-flex flex-column p-2 t-margin-left" style={{ "textDecoration": "none" }}>
                        <span className="t-medium-text">{suggestion.name}</span>
                        <small> @{suggestion.handle} </small>
                    </div>
                </div>
            );
        }
    }
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };
    handleUserRedirect = (id) => {
        this.props.addUserToList({
            list_id: this.props.data._id,
            user_id: id
        })
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        searchResults: state.recommendationReducer.searchResults
    }
}
const mapDispatchToProps = dispatch => {
    return {
       removeUserFromList: payload => dispatch(removeUserFromList(payload)),
       handleSearch: (query) => dispatch(handleSearch(query)),
       addUserToList: payload => dispatch(addUserToList(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditListModal);