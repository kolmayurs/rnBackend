import React from 'react';
import '../css/App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData,createUser} from '../actions/actions';

const mapStateToProps = state => {
	return{
		data: state.fetch.data,
		fetching: state.fetch.fetching
	}
}

const mapDispatchToProps = dispatch => {
	return{
		...bindActionCreators({fetchData,createUser},dispatch)
	}
}
class App extends React.Component {
	componentDidMount(){
		this.props.createUser('mayur','mayur1212@gmail.com','mayur');
	}
  render(){
    return (
    <div className="App">
    ddd
    </div>
  );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
