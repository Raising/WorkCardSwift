import React from 'react';
import { connect } from 'react-redux';
import {TimeTableActionType as TTAction, TimeTableState as TTState} from '../time-table-store';
import { Dispatch } from 'redux';


interface instertedProps {
  timeRange : string;
  active: boolean;
  onBodyClick: () => any;
}

const mapStateToProps = (state:TTState) => {
  return {
   
  };
};
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    // handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
    // handleDecrementClick: () => dispatch({type: 'DECREMENT'})
  }
};
type props =  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & instertedProps;
  const HourCell = ({timeRange,active,onBodyClick}:props) => (
    <div className={'hour-cell' + (active ? ' active' : '')}
    onClick={onBodyClick}>
      {timeRange}
    </div>
  );
  
  const Container = connect(mapStateToProps,mapDispatchToProps)(HourCell);
  

  export default Container;