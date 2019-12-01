import React from 'react';
import { connect } from 'react-redux';
import ContainerLoader from '../../components/container-loader/container-loader';
import { getListDetails } from './../../../redux/actions/list-action';
import Tweet from './../../components/tweet/tweet';
import list_image from '../../../assets/images/list_image.png';
class ListView extends React.Component { 
    constructor(props) {
        super(props);
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
    }
    render() {
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
                         <b>{this.props.data.subscriberCount}</b> <span className="t-secondary t-small-text">Subscribers</span>  </span>
                         <button class='btn btn btn-outline-primary'>Unsubscribe</button>
                    </div>
                    <div>
                        { this.props.data.tweets && this.props.data.tweets.map( tweet => {
                            return <Tweet tweet={tweet}/>
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <ContainerLoader/>
            )
        }
      
    }
    goBack() {
        if(this.props.location.state && this.props.location.state.prev) {
            this.props.history.push(this.props.location.state.prev);
        } else {
            this.props.history.goBack();
        }
    }
}
const mapStateToProps = state => {
    return {
        data: state.listReducer.listViewData
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        getListDetails: payload => dispatch(getListDetails(payload))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ListView);