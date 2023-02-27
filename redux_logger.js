const {legacy_createStore,applyMiddleware,bindActionCreators}=require('redux')
const createStore=legacy_createStore
const logger=require('redux-logger')

function addUsers(users){
    return {
        type:'ADD_USERS',
        payload:users
    }
}

const initialState=[]

const reducer=(state=initialState,action)=>{
       switch(action.type){
         case 'ADD_USERS':
            return {
                ...initialState,
                initialState: initialState.push(action.payload)
            }
        default:
            return state;
       }
}

const store=createStore(reducer,applyMiddleware(logger.createLogger()))
const actions=bindActionCreators({addUsers},store.dispatch)

console.log('initialState',store.getState())

actions.addUsers({name:"pankaj",age:19})
actions.addUsers({name:"vikash",age:20})
actions.addUsers({name:"harendra",age:21})
actions.addUsers({name:"jitendra",age:19})
