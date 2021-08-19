import { Provider } from 'react-redux';
import Counter from './components/counter'; 
import CounterStore from './counter-store';


const mainCounter = ({count,handleDecrementClick, handleIncrementClick}) => (
    <Provider store={CounterStore}>
      <Counter></Counter>
    </Provider>
);


export default mainCounter;