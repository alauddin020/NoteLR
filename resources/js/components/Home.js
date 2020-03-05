import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import WriteNote from "./WriteNote";
import EditDelete from "./EditDelete";
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            note: '',
            notes: [],
        }
    }
    componentDidMount(){
        if (localStorage.getItem('user') !==null) {
            const token = localStorage.getItem('tokenId');
            axios.get('/api/note', {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
                this.setState({
                    notes: response.data.note
                });
            }).catch(function (error) {
                if(error.response.status===401)
                {
                    localStorage.removeItem('user');
                    localStorage.removeItem('tokenId');
                    window.location.assign('/login');
                }
            })
        }
        else
        {
          let  allNote = JSON.parse(localStorage.getItem('notes'));
            this.setState({
                notes: allNote
            });
        }

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
            if (localStorage.getItem('user') !==null) {
                const data = {note : note};
                const token = localStorage.getItem('tokenId');
                axios.post('/api/note', data,{headers: {"Authorization": `Bearer ${token}`}})
                    .then((response) => {
                    this.componentDidMount();
                    this.setState({
                        note: ''
                    });
                })
            }
            else
            {
                if (localStorage.getItem('notes')===null)
                {
                    let notes = [];
                    notes.push(note);
                    localStorage.setItem('notes',JSON.stringify(notes));
                }
                else{
                    let notes = JSON.parse(localStorage.getItem('notes'));
                    notes.push(note);
                    localStorage.setItem('notes',JSON.stringify(notes));
                }
                this.setState({
                    notes: JSON.parse(localStorage.getItem('notes')),
                    note: ''
                });
            }

        }
        else
        {
            alert('write Something')
        }
    };
    delete(e){
        let id = e.target.getAttribute('data-key');
        if (localStorage.getItem('user') !==null)
        {
            const token = localStorage.getItem('tokenId');
            axios.delete('/api/note/'+id,{headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
                this.componentDidMount();
            })
        }
        else
        {
            let notes = JSON.parse(localStorage.getItem('notes'));
            notes.splice(id,1);
            this.setState({
                notes: notes
            });
            localStorage.setItem('notes',JSON.stringify(notes));
        }
    }
    render() {
            return (
                <div className="container mb-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <WriteNote
                                name={'Add New Note'}
                                label={'Write Note'}
                                note={this.state.note}
                                onchange={this.handleChange.bind(this)}
                                addNote={this.addNote.bind(this)}
                                inputName={'note'}
                                btn={'Save Note'}
                            />
                            {(this.state.notes && this.state.notes.length) ?
                                <EditDelete notes={this.state.notes} delete={this.delete.bind(this)} /> :
                                <div className={'card mt-2'}>
                                    <div className={'card-body'}>
                                        <strong>No Data Found</strong>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            );
    }
}
