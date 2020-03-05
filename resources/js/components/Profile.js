import React from 'react';
import axios from "axios";
import EditDelete from "./EditDelete";
import WriteNote from "./WriteNote";
export default class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            user: {},
            note: ''
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
    delete(e){
        let id = e.target.getAttribute('data-key');
        const token = localStorage.getItem('tokenId');
        axios.delete('/api/note/'+id,{headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
            this.componentDidMount();
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    addNote(){
        const note = this.state.note;
        // localStorage.removeItem('notes');
        if (note !=='')
        {
            const data = {note : note};
            const token = localStorage.getItem('tokenId');
            axios.post('/api/note/', data,{headers: {"Authorization": `Bearer ${token}`}})
                .then((response) => {
                    this.setState({
                        note: ''
                    });
                    this.props.history.push('/');
                })
        }
        else {
            alert('write something');
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card mb-2">
                            <div className="card-body">
                               <strong>Hi, {this.state.user.name} | {this.state.user.email}</strong>
                            </div>
                        </div>
                        <WriteNote
                            name={this.state.user.name}
                            label={'Add Note'}
                            note={this.state.note}
                            onchange={this.handleChange.bind(this)}
                            addNote={this.addNote.bind(this)}
                            inputName={'note'}
                            btn={'Add Note'}
                        />
                        {(this.state.user.note && this.state.user.note.length) ?
                            <EditDelete notes={this.state.user.note} delete={this.delete.bind(this)} />
                            : <strong>No Note Found</strong>}
                    </div>
                </div>
            </div>
        );
    }
}
