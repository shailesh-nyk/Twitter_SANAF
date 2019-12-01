
import React from 'react';
import { connect } from 'react-redux';
import config from './../../../config/app-config';
import { removeUserFromList } from './../../../redux/actions/list-action';

class EditListModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.getElementById('edit-list-name').value = this.props.data.name;
        document.getElementById('edit-list-desc').value = this.props.data.description;
        document.getElementById('edit-list-public').checked = this.props.data.isPublic;
    }
    render() {
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
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Edit Details
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="create-list-name">Name:</label>
                                        <input type="name" class="form-control" id="edit-list-name" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-list-desc">Description:</label>
                                        <input type="name" class="form-control"  id="edit-list-desc"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="create-list-public">Make Public:</label>
                                        <input type="checkbox" class="form-control" id="edit-list-public"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Members
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                                {this.props.data.list.map( user => {
                                    return (
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <img style={{width:"50px", borderRadius: "60px"}} src={config.image_server + user.avatar}/>
                                                <div>
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
            name: document.getElementById('edit-list-name').value,
            description:document.getElementById('edit-list-desc').value,
            isPublic: document.getElementById('edit-list-public').checked,
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
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
       removeUserFromList: payload => dispatch(removeUserFromList(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditListModal);