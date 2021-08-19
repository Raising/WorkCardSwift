import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      count: state
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
      handleDecrementClick: () => dispatch({type: 'DECREMENT'})
    }
  };
  const Component = ({count,handleDecrementClick, handleIncrementClick}) => (<div>
      <h1>Helloworld React & Redux! {count}</h1>
      <button onClick={handleDecrementClick}>Decrement</button>
      <button onClick={handleIncrementClick}>Increment</button>
    </div>
  );
  
  const Container = connect(mapStateToProps,mapDispatchToProps)(Component);
  

  export default Container;