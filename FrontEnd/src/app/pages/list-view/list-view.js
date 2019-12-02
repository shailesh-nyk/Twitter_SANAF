import React from 'react';
import { connect } from 'react-redux';
import ContainerLoader from '../../components/container-loader/container-loader';
import { getListDetails, editList, subscribeToList, unsubscribeToList } from './../../../redux/actions/list-action';
import Tweet from './../../components/tweet/tweet';
import list_image from '../../../assets/images/list_image.png';
import EditListModal from './../../components/edit-list-modal/edit-list-modal';

class ListView extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            owned: false,
            subscribed: false
        }
        this.editList = this.editList.bind(this);
    }
    componentWillMount() {
        this.props.getListDetails({
            list_id: this.props.match.params.list_id
        });
    }
    componentWillReceiveProps(next) {
        if (next.match.params.list_id !== this.props.match.params.list_id) {
            this.props.getListDetails({
                list_id: this.props.match.params.list_id
            });
        }
        if(next.data) {
            if(next.data.createdBy._id == this.props.user.id) {
                this.setState({
                    owned: true,
                    subscribed: false
                })
            } else if(next.data.subscribers.includes(this.props.user.id)) {
                this.setState({
                    owned: false,
                    subscribed: true
                })
            } else {
                this.setState({
                    owned: false,
                    subscribed: false
                })
            } 
        }
    }
    render() {
        let actionButton;
        if(this.state.owned) {
            actionButton = <button class='btn btn btn-outline-primary' data-toggle="modal"  data-target="#editListModal">Edit List</button>
        } else if(this.state.subscribed) {
            actionButton = <button class='btn btn btn-outline-primary' onClick={() => this.unsubscribe()}>Unsubscribe</button>
        } else {
            actionButton = <button class='btn btn btn-outline-primary' onClick={() => this.subscribe()}>Subscribe</button>
        }
        if(this.props.data) {
            return(
                <div>
                    <div className="t-topnav-container">
                        <i class="fas fa-arrow-left t-icon" onClick={() => this.goBack()}></i> <span className="t-left-margin-24 t-primary-bold">{this.props.data.name}</span>
                    </div>
                    <div>
                        <img style={{width: "100%"}} src={list_image} alt="list"/>
                    </div>
                    <div className="d-flex flex-column align-items-center t-container-border p-3">
                         <span className="t-bold">{this.props.data.name}</span>
                         <span className="t-secondary t-small-text">{this.props.data.description}</span>
                         <span> 
                             <span className="t-secondary t-small-text">Created by: </span> 
                             <span>{this.props.data.createdBy.name}</span>&nbsp; &nbsp; 
                             <span className="t-secondary t-small-text">@{this.props.data.createdBy.handle} </span> 
                         </span>
                         <span><b>{this.props.data.list.length}</b> <span className="t-secondary t-small-text">Members</span> &nbsp; &nbsp; 
                         <b>{this.props.data.subscribers.length}</b> <span className="t-secondary t-small-text">Subscribers</span>  </span>
                         {actionButton}
                    </div>
                    <div>
                        { this.props.data.tweets && this.props.data.tweets.map( tweet => {
                            return <Tweet tweet={tweet}/>
                        })}
                    </div>
                    <EditListModal data={this.props.data} editList={this.editList}/>
                </div>
            )
        } else {
            return (
                <ContainerLoader/>
            )
        }
        
    }
    editList(body) {
        this.props.editList(body);
        window.$('#editListModal').modal('hide');
    }
    goBack() {
        if(this.props.location.state && this.props.location.state.prev) {
            this.props.history.push(this.props.location.state.prev);
        } else {
            this.props.history.goBack();
        }
    }
    subscribe() {
        this.props.subscribeToList({
            list_id: this.props.data._id,
            user_id: this.props.user.id
        })
    }
    unsubscribe() {
        this.props.unsubscribeToList({
            list_id: this.props.data._id,
            user_id: this.props.user.id
        })
    }
}
const mapStateToProps = state => {
    return {
        data: state.listReducer.listViewData,
        user: state.auth.user
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        getListDetails: payload => dispatch(getListDetails(payload)),
        editList: payload => dispatch(editList(payload)), 
        subscribeToList: payload => dispatch(subscribeToList(payload)), 
        unsubscribeToList: payload => dispatch(unsubscribeToList(payload)), 
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListView);