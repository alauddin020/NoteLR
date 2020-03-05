import React from 'react';
export default class WriteNote extends React.Component{
    constructor(props) {
        super(props);
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
            <div className="card">
                <div className="card-header"><strong>{this.props.name}</strong></div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">{this.props.label}</label>
                        <textarea style={style} onKeyUp={this.handleKeyDown} value={this.props.note} onChange={this.props.onchange}  className="form-control" placeholder="Write Something" name={this.props.inputName} id="formGroupExampleInput" />
                    </div>
                    <div className="form-group">
                        <button onClick={this.props.addNote} type="button" className="btn btn-success">{this.props.btn}</button>
                    </div>
                </div>
            </div>
        );
    }
}
