import React from 'react';
import axios from "axios";
export default class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        if (localStorage.getItem('user') ===null) {
            this.props.history.push('/login');
        }
        const token = localStorage.getItem('tokenId');
        axios.get('/api/user-login/',{headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
            this.setState({
                user: response.data
            })
        }).catch(function (error) {
            if(error.response.status===401)
            {
                localStorage.removeItem('user');
                localStorage.removeItem('tokenId');
                window.location.assign('/login');
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header"><h4 className={'card-title'}>{this.state.user.name}</h4></div>
                            <div className="card-body">
                               <strong> {this.state.user.email}</strong><br/>
                                {(this.state.user.note && this.state.user.note.length) ?
                                    this.state.user.note.map((note,key)=>{
                                       return(
                                           <div key={key} className={'card mt-1 mb-1'}>
                                               <div className={'card-body'}>
                                                   <strong>{note.note}</strong>
                                               </div>
                                           </div>
                                       );
                                    })
                                    : <strong>No Note Found</strong>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
