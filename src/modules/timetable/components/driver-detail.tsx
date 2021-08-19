import React, { useState } from 'react';
import { Driver } from '../time-table-store';
import { TimeTableActionType as TTAction, TimeTableState as TTState } from '../time-table-store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';


const mapStateToProps = (state: TTState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createNewDriver: (name:string) => dispatch(TTAction.CREATE_DRIVER.asAction({name})),
  }
};
type props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function DriverDetail({createNewDriver }: props) {
  const [driverName, setDriverName] = useState('');
  const pushNewDriver = function(){
    createNewDriver(driverName);
    setDriverName('');
  };
  return <div
    className='driver-detail'
  >
    <input placeholder="New Driver Name" value={driverName} onChange={e => setDriverName(e.target.value)}/>
    <button {...{disabled:driverName.length === 0}} onClick={pushNewDriver}>new</button>
  </div>;
};

const Container = connect(mapStateToProps, mapDispatchToProps)(DriverDetail);
export default Container;
