import React from 'react';
import { connect } from 'react-redux';
import DayColumn from './day-column';
import {TimeTableActionType as TTAction, TimeTableState as TTState} from '../time-table-store';
import { Dispatch } from 'redux';

  const mapStateToProps = (state:TTState) => {
    return {
      weekDays : state.weekDays
      // count: state
    };
  };
  const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
      // handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
      // handleDecrementClick: () => dispatch({type: 'DECREMENT'})
    }
  };
  type props =  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

  const weekTable = ({weekDays}:props) => (<div className='week-table'>
      {weekDays.map((dayName,index) =>
           <DayColumn weekDay={dayName} dayIndex={index}></DayColumn>
      )}
    </div>
  );
  
  const Container = connect(mapStateToProps,mapDispatchToProps)(weekTable);
  

  export default Container;