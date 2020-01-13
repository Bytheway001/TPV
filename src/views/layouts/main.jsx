import React,{Fragment} from 'react';

import Bar from '../Navbar';

const Main = props => {
    return (
            <Fragment>
                <Bar shown={props.shown}/>
                {props.children}
            </Fragment>
    )
}

export default Main;