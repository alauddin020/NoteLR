import React from 'react';
import {Link} from "react-router-dom";
export default class EditDelete extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                {this.props.notes.map((note,key)=>{
                    return(
                        <div className={'card mt-2'}  key={key}>
                            <div className={'card-body'}>
                                <div className={'row'}>
                                    <div className={'col-md-9'}>
                                        {localStorage.getItem('user') !==null ? note.note : note}
                                    </div>
                                    <div className={'col-md-3 pull-right'}>
                                        {localStorage.getItem('user') !==null ? <Link className="btn btn-info mr-2" role="button" to={'note/'+note.id+'/edit'}>Edit</Link> :''}
                                        <input type={'button'} className={'btn btn-danger'} value={'X'} data-key={localStorage.getItem('user') !==null ?note.id : key} onClick={this.props.delete} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                })}
            </div>
        );
    }
}
