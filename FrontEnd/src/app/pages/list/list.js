import React from 'react';
import { connect } from 'react-redux';
import { getUserLists, createUserList } from './../../../redux/actions/list-action';
import ListItem from '../../components/list_item/list_item';
import CreateListModal from '../../components/create-list-modal/create-list-modal';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.createList = this.createList.bind(this);
    }
    componentWillMount(){
        this.props.getUserLists();
    }
    render() {
        return (
        <div>
            <div className="t-topnav-container d-flex justify-content-between" >My Lists
                 <button class='btn btn btn-outline-primary' data-toggle="modal"  data-target="#createListModal">New List</button></div>
            <div>
            <nav class="t-tab-pane">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-owned-tab" data-toggle="tab" href="#nav-owned" role="tab" aria-controls="nav-owned" aria-selected="true">Owned</a>
                    <a class="nav-item nav-link" id="nav-subscribed-tab" data-toggle="tab" href="#nav-subscribed" role="tab" aria-controls="nav-subscribed" aria-selected="false">Subscribed</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-owned" role="tabpanel" aria-labelledby="nav-owned-tab">
                    {this.props.ownedList.map(list => {
                        return <ListItem data={list}/>
                    })}
                    {this.props.ownedList.length == 0 ? (
                        <div class='t-secondary t-small-text p-5'>
                            You haven't created any list
                        </div>
                    ) : (null)}
                </div>
                <div class="tab-pane fade" id="nav-subscribed" role="tabpanel" aria-labelledby="nav-subscribed-tab">
                    {this.props.subscribedList.map(list => {
                        return <ListItem data={list}/>
                    })}
                     {this.props.subscribedList.length == 0 ? (
                        <div class='t-secondary t-small-text p-5'>
                            You haven't subscribed to any list
                        </div>
                    ) : (null)}
                </div>
            </div>
            </div>
            <CreateListModal createList={this.createList}/>
        </div>
       )
    }
    createList(body) {
        this.props.createUserList(body);
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        ownedList: state.listReducer.ownedList,
        subscribedList: state.listReducer.subscribedList
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUserLists: () => dispatch(getUserLists()),
        createUserList : (payload) =>  dispatch(createUserList(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);