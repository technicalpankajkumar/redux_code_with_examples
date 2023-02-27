const redux=require('redux')
const createStore=redux.legacy_createStore
const bindActionCreators=redux.bindActionCreators
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')

const REQUEST='FETCH_USERS_REQUESTED';
const SUCCESS= 'FETCH_USERS_SUCCESSED';
const FAILD='FETCH_USERS_FAILED'

const initialState={
    loading:false,
    users:[],
    error:''
}

//action

function requestUsers(){
    return{
        type: REQUEST,
    }
}
function successUsers(users){
    return {
        type:SUCCESS,
        payload:users
    }
}
function faildUsers(error){
    return {
        type: FAILD,
        payload:error
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case REQUEST:
            return {
                ...state,
                loading:true
            }
        case SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
            }
        case FAILD:
            return {
                loading:false,
                users:[],
                error:action.payload
            }
        default:
            return state;
    }
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(requestUsers())
        axios.get("https://jsonplaceholder.typicode.com/users").then((response)=>{
            const users=response.data.map((value)=>{
                return value.id;
            })
            dispatch(successUsers(users))
        }).catch((error)=>{
            dispatch(faildUsers(error.message))
        })
        
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
const actions=bindActionCreators({requestUsers,successUsers,faildUsers,fetchUsers},store.dispatch)
store.subscribe(()=>{console.log(store.getState())})
actions.fetchUsers()