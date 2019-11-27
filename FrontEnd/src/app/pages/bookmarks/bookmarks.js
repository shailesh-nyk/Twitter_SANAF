import React from 'react';
import { connect } from 'react-redux';
import Tweet from '../../components/tweet/tweet';
import { getBookmarks } from '../../../redux/actions/user-action';

class BookMarks extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getBookmarks();
    }
    render() {
        return (
            <div>
                <div className="t-topnav-container">Bookmarks</div>
                { this.props.bookmarks && this.props.bookmarks.map( tweet => {
                    return <Tweet tweet={tweet}/>
                })}
            </div>
        )
    }
       
}

const mapStateToProps = state => {
    return {
        bookmarks: state.userReducer.bookmarks
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getBookmarks: () => dispatch(getBookmarks())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BookMarks);