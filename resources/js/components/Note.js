import React from 'react';
import axios from "axios";
export default class Note extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            notes: '',
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
                    notes: response.data.data.note,
                    name: response.data.data.user.name
                })
            }
            else
            {
                this.props.history.push('/404');
            }
        }).catch(function (error) {
            if(error.response.status===401)
            {
                localStorage.removeItem('user');
                localStorage.removeItem('tokenId');
                window.location.assign('/login');
            }
        });
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    addNote(){
        const note = this.state.notes;
        // localStorage.removeItem('notes');
        if (note !=='')
        {
            const data = {note : note};
            const token = localStorage.getItem('tokenId');
            axios.put('/api/note/'+this.state.id, data,{headers: {"Authorization": `Bearer ${token}`}})
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
    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }
    render() {
        const style = {
            overflowY: 'hidden',
            resize:'none',
            boxSizing:'border-box',
            fontSize:'15px'};
        return (
            <div className={'container'}>
                <div className={'card'}>
                    <div className={'card-header'}><strong>{this.state.name}</strong></div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput">Update Note</label>
                            <textarea style={style} onKeyUp={this.handleKeyDown} value={this.state.notes} onChange={this.handleChange.bind(this)}  className="form-control" placeholder="Write Something" name={'notes'} id="formGroupExampleInput" />
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
