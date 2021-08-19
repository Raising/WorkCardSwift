import React from 'react';
import { Driver } from '../time-table-store';

interface props {
  driver:Driver;
  isSelected:boolean;
  onBodyClick: () => any;
}

const driverRow = ({driver,onBodyClick,isSelected}:props) => (
    <div 
      className={'driver-row' + (isSelected ? ' selected' : '')}
      onClick={onBodyClick}
      >
      {driver.name}
    <div className="used-hours">
      { driver.workHours.reduce((acc,dayHours) => {acc+=dayHours.length;return acc},0)}
    </div>
    
  </div>
);

export default driverRow;