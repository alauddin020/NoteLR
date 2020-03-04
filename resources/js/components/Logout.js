import React from "react";
import axios from "axios";
export default class Logout extends React.Component{
    constructor(props)
    {
        super(props);
        // this.refresh();
        this.logout();
        // this.isLogin();
    }
    logout(){
        const api = '/api/logout/';
        const token = localStorage.getItem('tokenId');
        axios.post(api, {headers: {"Authorization": `Bearer ${token}`}}).then(response => {
            localStorage.removeItem('user');
            localStorage.removeItem('tokenId');
            window.location.assign('/login');
        }).catch(error => {
            localStorage.removeItem('user');
            localStorage.removeItem('tokenId');
            window.location.assign('/login');
            console.log(error);
        })
    }
    isLogin()
    {
        if (localStorage.getItem('user') ===null) {
            this.props.history.push('/login');
        }
    }
    refresh()
    {

    }
    render() {
        return(
            <div>
                <strong>Log out Successfully</strong>
            </div>
        );
    }
}
