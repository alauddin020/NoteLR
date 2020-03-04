import React from "react";
import axios from "axios";
const emailRegex = RegExp(
    /^([a-z0-9_\.\-\+]{4,40})+\@(([a-z0-9\-]{4,40})+\.)+([a-z0-9]{2,5})+$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};
export default class LogIn extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            email: '',
            password: '',
            loginError: '',
            formErrors: {
                email: "",
                password: ""
            },
            notes: [],
        }
        this.userData();
    }
    componentDidMount(){
        let allNote = JSON.parse(localStorage.getItem('notes'));
        this.setState({
            notes: allNote
        });
    }
    userData()
    {
        if (localStorage.getItem('user') !==null) {
            this.props.history.push('/');
        }
    }
    handelOnChange(e){
        e.preventDefault();
        //this.setState({[e.target.name]: e.target.value});
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    }
    login(e){
        e.preventDefault();
        //console.log(this.state);
        axios.post('/api/login/', this.state).then((response) => {
            //this.props.history.push('/');
            if (response.data.error==='ok')
            {
                this.setState({
                    loginError: response.data.message
                })
            }
            else
            {
                this.setState({
                    loginError: ''
                })
                // console.log(response.data.data);
                localStorage.removeItem('notes');
                localStorage.setItem('tokenId',response.data.message)
                localStorage.setItem('user',response.data.name)
                // window.location.reload();
                window.location.assign('/user');
            }
        }).catch(error=> {
            if (error.error==='ok')
            {
                console.log(error)
            }
            console.log(error)
        });
    }
    render() {
        const { formErrors } = this.state;
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <strong>Login</strong>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.login.bind(this)}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>
                                        <div className="col-md-6">
                                            <input id="email" placeholder={'Enter Email Address'}  onChange={this.handelOnChange.bind(this)} type="email" className={formErrors.email.length > 0 ? "form-control is-invalid error" : 'form-control'} name="email"  required autoComplete="email" autoFocus />
                                        </div>
                                        {formErrors.email.length > 0 && (
                                            <span className="errorMessage">{formErrors.email}</span>
                                        )}
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input placeholder={'Password'}  id="password"  name="password" onChange={this.handelOnChange.bind(this)} type="password" className={formErrors.password.length > 0 ? "form-control is-invalid error" : 'form-control'}  />
                                        </div>
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>
                                        )}
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button disabled={formErrors.password.length > 0 || formErrors.email.length >0 ? 'disabled' : ''} type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                            <strong className={'ml-2'} style={{color:'red'}}>{this.state.loginError}</strong>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
