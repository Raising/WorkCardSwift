import { Provider } from 'react-redux';
import WeekTable from './components/week-table'; 
import DriversMenu from './components/drivers-menu';
import TimeTableStore from './time-table-store';
import './time-table-style.scss';

const mainTableTime = () => (
    <Provider store={TimeTableStore}>
      <div className='time-table-main' >
        <DriversMenu></DriversMenu>
        <WeekTable></WeekTable>
      </div>
    </Provider>
);

export default mainTableTime;