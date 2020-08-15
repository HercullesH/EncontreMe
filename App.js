import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { changeCount } from './src/actions/counts';
import { bindActionCreators } from 'redux';

import AuthRoute from './src/routes/auth.route'
import AppRoute from './src/routes/app.route'
import Route from './src/routes'
import Loading from './src/components/loading'

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    
    return (
      <>
       
        <Route/>

        {this.props.loading && <Loading/>}
      </>
      
    );
  }
};


const mapStateToProps = state => ({
  count: state.count.count,
  loading: state.loading.loading,
  user: state.user
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({changeCount}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)