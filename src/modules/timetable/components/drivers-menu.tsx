import React from 'react';
import { connect } from 'react-redux';
import DriverRow from './driver-row';
import { TimeTableActionType as TTAction, TimeTableState as TTState } from '../time-table-store';
import { Dispatch } from 'redux';
import DriverDetail from './driver-detail';

const mapStateToProps = (state: TTState) => {
  return {
    drivers: state.drivers,
    selectedDriver: state.selectedDriver
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    selectectDriver: (index: Number) => () => dispatch(TTAction.SELECT_DRIVER.asAction(index)),
  }
};
type props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const driversMenu = (inputs: props) =>
(<div className='drivers-menu'>
  <div className='drivers-header'>
    <DriverDetail/>
  </div>
  <div className='drivers-container'>
    {inputs.drivers.map((driver, index) =>
      <DriverRow
        key={driver.index}
        driver={driver}
        onBodyClick={inputs.selectectDriver(driver.index)}
        isSelected={driver.index === inputs.selectedDriver}
      />
    )}
  </div>
</div>
);

const Container = connect(mapStateToProps, mapDispatchToProps)(driversMenu);


export default Container;