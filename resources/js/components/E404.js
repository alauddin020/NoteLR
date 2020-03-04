import React, {Component} from 'react';
export default class E404 extends Component{
    render() {
        return(
            <div className={'card'}>
                <div className={'card-header'}><strong>Opps!!</strong></div>
                <div className={'card-body'}>
                    <h3>404 Page Not Found</h3>
                </div>
            </div>
        );
    }
}
