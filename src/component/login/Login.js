import React from "react"
import Input from "../../utility/Input";
import "./Login.css";
import {login} from "./LoginApiClient";

class Login extends React.Component {
    state = {
        fields: this.props.fields || {
            username: '',
            password: '',
        },
        fieldErrors: {}
    };

    validate = () => {
        const user = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
        if (!user.username) return true;
        if (!user.password) return true;
        if (errMessages.length) return true;
        return false;
    };

    render() {
        return (
            <div className="form">
                <h1>Welcome to All</h1>
                <br/>
                <form className="form" onSubmit={this.onFormSubmit}>
                    <Input displayName="用户名"
                           name="username"
                           value={this.state.fields.username}
                           onChange={this.onInputChange}
                           validate={(val) => val ? false : "用户名不能为空"}
                    />
                    <br/>
                    <Input displayName="密码"
                           name="password"
                           value={this.state.fields.password}
                           onChange={this.onInputChange}
                           validate={(val) => val ? false : "密码不能为空"}
                    />
                    <br/>
                    <input type="submit" value="登录" disabled={this.validate()}/>
                </form>
            </div>
        )
    }

    onInputChange = ({name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        fields[name] = value;
        fieldErrors[name] = error;
        this.setState({fields, fieldErrors});
    }

    onFormSubmit = (evt) => {
        const user = this.state.fields;
        evt.preventDefault();
        if (this.validate()) return;
        login(user).then((response) => {
            alert(response.data.msg)
        })
    }
}

export default Login