const redux=require('redux')
const createStore=redux.legacy_createStore
const combineReducers=redux.combineReducers

function stockOfMiPhone(qty=0){
 return {
    type: 'STOCK_OF_MI_PHONE',
    payload:qty
 }
}
function orderOfMiPhone(qty=1){
    return{
        type: 'ORDER_OF_MI_PHONE',
        payload:qty
    }
}
function stockOfRealmiPhone(qty=0){
    return{
        type: 'STOCK_OF_REALMI_PHONE',
        payload:qty
    }
}
function orderOfRealmiPhone(qty=1){
    return {
        type: 'ORDER_OF_REALMI_PHONE',
        payload:qty
    }
}
const initialStateMiPhone={
    numOfMiPhone:10,
}
const initialStateRealmiPhone={
    numOfRealmiPhone:20
}
const reducerMiPhone =(state=initialStateMiPhone, action )=>{
     switch(action.type){
        case 'STOCK_OF_MI_PHONE':
            return{
                ...state,
                numOfMiPhone: state.numOfMiPhone + action.payload
            }
        case 'ORDER_OF_MI_PHONE':
            return{
                ...state,
                numOfMiPhone: state.numOfMiPhone - action.payload
            }
        default:
            return state;
     }
}

const reducerRealmiPhone=(state = initialStateRealmiPhone,action)=>{
    switch(action.type){
        case 'STOCK_OF_REALMI_PHONE':
            return{
                ...state,
                numOfRealmiPhone: state.numOfRealmiPhone + action.payload
            }
        case 'ORDER_OF_REALMI_PHONE':
            return {
                ...state,
                numOfRealmiPhone: state.numOfRealmiPhone - action.payload
            }
        default:
            return state;
    }
}
const reducers=combineReducers({ reducerMiPhone:reducerMiPhone, reducerRealmiPhone:reducerRealmiPhone})
const store = createStore(reducers)

console.log('initialState: ',store.getState())

const unsubscribe=store.subscribe(()=>console.log('updatedState', store.getState()))

store.dispatch(orderOfMiPhone(2))

const actions=redux.bindActionCreators({ orderOfMiPhone,stockOfMiPhone, stockOfRealmiPhone, orderOfRealmiPhone},store.dispatch)

actions.orderOfRealmiPhone(2)

unsubscribe()