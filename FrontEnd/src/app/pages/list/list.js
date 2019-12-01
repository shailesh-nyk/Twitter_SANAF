import React from 'react';
import { connect } from 'react-redux';
import { getUserLists } from './../../../redux/actions/list-action';
import store from './../../../store';
import ListItem from '../../components/list_item/list_item';

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getUserLists();
    }
    render() {
        return (
        <div>
            <div className="t-topnav-container">My Lists</div>
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
                </div>
                <div class="tab-pane fade" id="nav-subscribed" role="tabpanel" aria-labelledby="nav-subscribed-tab">
                    {this.props.subscribedList.map(list => {
                        return <ListItem data={list}/>
                    })}
                </div>
            </div>
            </div>
        </div>
       )
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
        getUserLists: () => dispatch(getUserLists())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);