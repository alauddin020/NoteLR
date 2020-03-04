import React from 'react';
import axios from "axios";
export default class Note extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            note:{},
            name: '',
            id: this.props.match.params.id,
        }
    }
    componentDidMount()
    {
        if (localStorage.getItem('user') ===null) {
            this.props.history.push('/');
        }
        const token = localStorage.getItem('tokenId');
        axios.get('/api/note/'+ this.state.id+'/edit',{headers: {"Authorization": `Bearer ${token}`}}).then(response => {
            if (response.data.message==='ok')
            {
                this.setState({
                    note: response.data.data,
                    name: response.data.data.user.name
                })
            }
            else
            {
                this.props.history.push('/404');
            }
        });
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value

        })
    }
    addNote(){

    }
    render() {
        return (
            <div className={'container'}>
                <div className={'card'}>
                    <div className={'card-header'}><strong>{this.state.name}</strong></div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput">Update Note</label>
                            <textarea value={this.state.note.note} onChange={this.handleChange.bind(this)}  className="form-control" placeholder="Write Something" name={'note'} id="formGroupExampleInput" />
                        </div>
                        <div className="form-group">
                            <button onClick={this.addNote.bind(this)} type="button" className="btn btn-success">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
