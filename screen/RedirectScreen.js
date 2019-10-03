import React, {Component} from 'react';

class Redirect extends Component {
    componentDidMount(){
        this.props.history.push('/Login');
    }

    render(){
        return (
            <div>Redirecting...</div>
        );
    }
}

export default Redirect;