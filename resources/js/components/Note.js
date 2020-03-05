import React from 'react';
import axios from "axios";
import E404 from "./E404";
import WriteNote from "./WriteNote";
export default class Note extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            notes: '',
            id: this.props.match.params.id,
            notFound: false,
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
                //this.props.history.push('/404');
                this.setState({
                    notFound: true
                })
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
        if (this.state.notFound)
        {
            return (
              <E404 />
            );
        }
        return (
            <div className={'container'}>
                <WriteNote
                    name={this.state.name}
                    label={'Update Note'}
                    note={this.state.notes}
                    onchange={this.handleChange.bind(this)}
                    addNote={this.addNote.bind(this)}
                    inputName={'notes'}
                    btn={'Update Note'}
                />
            </div>
        )
    }
}
