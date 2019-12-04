import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from "react-redux";
import Tweet from "../tweet/tweet"

class ProfileTweets extends Component {
    constructor(){
        super()
        this.state = {
            data:[]
        }
    }
    componentDidMount=()=>{
        Axios.get('/api/tweet/user?id='+this.props.id).then(response=>{
            console.log(response.data.payload);
            this.setState({
                data:response.data.payload
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            Axios.get('/api/tweet/user?id='+ nextProps.id).then(response=>{
                console.log(response.data.payload);
                this.setState({
                    data:response.data.payload
                })
            })
        }
     }   
    render() {
        return (
            <div>
                 {  this.state.data.map( tweet => {
                return <Tweet tweet={tweet}/>
            })}
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.auth.user
    }
}
export default connect(mapStateToProps)(ProfileTweets);
