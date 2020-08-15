import React, { Component } from 'react'
import AuthRoute from './auth.route'
import AppRoute from './app.route'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Route extends Component {
    constructor(props) {
        super(props)
      }

    render(){
        return(
                this.props.user.signed ? <AppRoute/> : <AuthRoute/>
            )
    }
    
}

const mapStateToProps = state => ({
    user: state.user
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({}, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Route)