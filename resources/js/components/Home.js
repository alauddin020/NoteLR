import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
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
                            <div className="card">
                                <div className="card-header">Add New Note</div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="formGroupExampleInput">Write Note</label>
                                        <textarea value={this.state.note} onChange={this.handleChange.bind(this)}  className="form-control" placeholder="Write Something" name={'note'} id="formGroupExampleInput" />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={this.addNote.bind(this)} type="button" className="btn btn-success">Save Note</button>
                                    </div>
                                </div>
                            </div>
                            {(this.state.notes && this.state.notes.length) ? this.state.notes.map((note,key)=>{
                                return(
                                    <div className={'card mt-2'}  key={key}>
                                        <div className={'card-body'}>
                                            <div className={'row'}>
                                                <div className={'col-md-9'}>
                                                    {localStorage.getItem('user') !==null ? note.note : note}
                                                </div>
                                                <div className={'col-md-3 pull-right'}>
                                                    {localStorage.getItem('user') !==null ? <Link className="btn btn-info mr-2" role="button" to={'note/'+note.id+'/edit'}>Edit</Link> :''}
                                                    <input type={'button'} className={'btn btn-danger'} value={'X'} data-key={localStorage.getItem('user') !==null ?note.id : key} onClick={this.delete.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );

                            }) :
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
