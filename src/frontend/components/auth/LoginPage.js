import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {login} from "../../actions/user-actions";
import {connect} from 'react-redux';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: ""
        }
        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onUserIdChange(event) {
        this.setState({userId: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        let error;
        if (this.props.error !== null) {
            error = <div><p>{this.props.error}</p></div>
        }

        return(
            <div>
                <h1>Login</h1>
                <div>
                    <input type="text"
                           value={this.state.userId}
                           onChange={this.onUserIdChange}/>
                </div>
                <div>
                <input type="password"
                       value={this.state.password}
                       onChange={this.onPasswordChange}/>
                </div>
                {error}
                <div onClick={this.signIn}>Log in!</div>
                <Link to={"/signup"}>Click here to sign up!</Link>
            </div>
        );
    }
}

LoginPage.propTypes = {
    signIn: PropTypes.func.isRequired,
    error: PropTypes.string
};

function mapStateToProps(state) {
    return {
        error: state.error,
        auth: state.authenticated
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: () => {
            dispatch(login(this.state.userId, this.state.password, this.props.history));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));