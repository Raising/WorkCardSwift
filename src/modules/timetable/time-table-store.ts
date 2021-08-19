import { createStore, Action } from "redux";

export interface Driver{
    index:number,
    name : string;
    workHours : (number[])[]    
}

export interface Solution{

}

export interface TimeTableState {
    dayHours : string[];
    weekDays : string[]; 
    drivers : Driver[];
    selectedDriver: number;
    solutions: Solution[];
};


export enum TimeTableActionType {
  'SELECT_DRIVER' = 'SELECT_DRIVER',
  'CREATE_DRIVER' = 'CREATE_DRIVER',
  TOGGLE_WORK_HOUR = "TOGGLE_WORK_HOUR"
}

export interface TimeTableAction extends Action {
    type: TimeTableActionType,
    payload: any,
};

const initialState: TimeTableState = {
    dayHours : ['Primera','Segunda','Tercera','Recreo','Cuarta','Quinta','Sexta'],
    weekDays : ['Monday','Tuesday','Wendesday','Thursday','Friday'],//,'Saturday','Sunday'],
    drivers: [
        {index:0,name:'Ortega', workHours:[[0,1,2,3],[1,2,3,4],[0,1,2,3,4,5],[0,1,2,3],[0,2,3,4,5,6]]},
    ],
    selectedDriver: 0,
    solutions: [],
}

const timeTableActions:{[key in TimeTableActionType]:(state:TimeTableState, payload:any)=>TimeTableState} = {
    TOGGLE_WORK_HOUR:(state,payload:{dayIndex:number,hourIndex:number}) => {
        let isPresent = state.drivers[state.selectedDriver].workHours[payload.dayIndex].indexOf(payload.hourIndex) !== -1;
        if (isPresent){
            return state.removeElement(`drivers.${state.selectedDriver}.workHours.${payload.dayIndex}`,payload.hourIndex);
        }else{
            return state.pushElement(`drivers.${state.selectedDriver}.workHours.${payload.dayIndex}`,payload.hourIndex);
        }
    },
    SELECT_DRIVER: (state,payload:number) => state.setProperty('selectedDriver',payload),
    CREATE_DRIVER: (state,payload:{name:string}) => {
        
        let newDriver:Driver = {
            name:payload.name,
            index:state.drivers.length,
            workHours:[...new Array(state.weekDays.length)].map(el => [])
        };
        
        return state.pushElement(`drivers`,newDriver);
    },
}

const timeTableReducer = function (state:TimeTableState = initialState, action:TimeTableAction) {
    let reducer :(state:TimeTableState,payload:any) =>TimeTableState = timeTableActions[action.type]; 
    if (reducer){
        return reducer(state,action.payload);
    }else{
        return state;
    }
};

let store = createStore(timeTableReducer);


export default store;
