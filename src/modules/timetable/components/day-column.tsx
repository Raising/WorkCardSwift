import React from 'react';
import { connect } from 'react-redux';
import HourCell from './hour-cell';
import {TimeTableActionType as TTAction, TimeTableState as TTState} from '../time-table-store';
import { Dispatch } from 'redux';


interface instertedProps {
  weekDay : string;
  dayIndex : number;
}

const mapStateToProps = (state:TTState) => {
  return {
    dayHours : state.dayHours,
    selectedDriverWorkHours : state.drivers[state.selectedDriver]?.workHours
  };
};
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    toggleWorkHour:(dayIndex:number,hourIndex:number) => () => dispatch(TTAction.TOGGLE_WORK_HOUR.asAction({dayIndex,hourIndex})), 
  }
};
type props =  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & instertedProps;
 
  const DayColumn = ({weekDay,dayIndex,dayHours,toggleWorkHour,selectedDriverWorkHours}:props) => (<div className='day-column'>
      { weekDay }
      {dayHours.map((range,index) =>
           <HourCell
            key={index} 
            timeRange={range} 
            onBodyClick={toggleWorkHour(dayIndex,index)}
            active={selectedDriverWorkHours[dayIndex].indexOf(index) !== -1}
           />
      )}
    </div>
  );
  
  const Container = connect(mapStateToProps,mapDispatchToProps)(DayColumn);
  

  export default Container;