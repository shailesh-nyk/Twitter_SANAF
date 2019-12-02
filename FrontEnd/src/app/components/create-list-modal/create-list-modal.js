
import React from 'react';
import { connect } from 'react-redux';

class CreateListModal extends React.Component { 
    constructor(props) {
        super(props);
    }
    render() {
        return ( 
            <div class="modal fade" id="createListModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content t-dark-container">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Create New List</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={(e) => this.createList(e)}>
                <div class="modal-body">
                        <div class="form-group">
                            <label for="create-list-name">Name:</label>
                            <input type="name" class="form-control" id="create-list-name" required/>
                        </div>
                        <div class="form-group">
                            <label for="create-list-desc">Description:</label>
                            <input type="name" class="form-control"  id="create-list-desc"/>
                        </div>
                        <div class="form-group" style={{display:"flex"}}>
                            <label style={{flex: "1"}} for="create-list-public">Make Public:</label>
                            <input style={{flex: "1"}} type="checkbox" class="form-control" id="create-list-public"/>
                        </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Done</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        )
    }
    createList(e) {
        e.preventDefault();
        let body = {
            name: document.getElementById('create-list-name').value,
            description:document.getElementById('create-list-desc').value,
            isPublic: document.getElementById('create-list-public').checked,
            user: this.props.user.id
        }
        this.props.createList(body);
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, null)(CreateListModal);