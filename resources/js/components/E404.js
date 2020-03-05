import React, {Component} from 'react';
export default class E404 extends Component{
    render() {
        return(
            <div className={'card'}>
                <div className={'card-header'}><strong>Opps!!</strong></div>
                <div className={'card-body'}>
                    <h3>This page isn't available</h3>
                    <p>The link you followed may be broken, or the page may have been removed.</p>
                </div>
            </div>
        );
    }
}
