import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class HomePage extends React.Component {
    render() {
        let content;
        console.log(this.props);
        if (this.props.authenticated) {
            content = (<div>
                <h2>Welcome back, ${this.props.userId}!</h2>
                <Link to={"/games"}>Click here to play!</Link>
            </div>);
        } else {
            content = (<div>
                <h2>You need to sign up or log in to play!</h2>
                <Link to={"/signup"}>Click here to sign up!</Link>
                <br/>
                <Link to={"/login"}>Click here to log in!</Link>
            </div>);
        }

        return(
            <div>
                <h1>Quiz!!</h1>
                {content}
            </div>
        );
    }
}

HomePage.propTypes = {
    authenticated: PropTypes.bool,
    userId: PropTypes.string
};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        userId: state.auth.userId
    };
}

export default withRouter(connect(mapStateToProps)(HomePage));