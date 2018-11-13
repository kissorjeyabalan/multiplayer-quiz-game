import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class HomePage extends React.Component {
    render() {
        let content;
        if (this.props.authenticated) {
            content = (
                <div>
                    <div>
                        <h2>Quiz!!!</h2>
                        <p>Play against your friends and see who prevails!</p>
                    </div>
                <div className="btnPart">
                    <Link to={"/games"}>Click here to play!</Link>
                </div>
            </div>);
        } else {
            content = (<div>
                <h2>You need to sign up or log in to play!</h2>
            </div>);
        }

        return(
            <div>
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