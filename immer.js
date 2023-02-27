const {legacy_createStore , bindActionCreators, combineReducers, applyMiddleware}= require('redux')
const createStore=legacy_createStore
const produce=require('immer').produce

const updateUser=(city="Jaunpur")=>{
    return {
        type:'UPDATE_USER',
        payload:city
    }
}

const initialState={
    name:"PankajKumar",
    age:21,
    address:{
        city:'Azamgarh',
        post:'Saraimeer',
        village:'Hajipur',
        pincode:276305
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'UPDATE_USER':
            // return {
            //     ...state,
            //     address:{
            //         ...state.address,
            //         city: action.payload
            //     }
            // }
            // return produce(state,(draft)=>{
            //     draft.address.city=action.payload
            // })
        default:
            return state;
    }
}

const store=createStore(reducer)

console.log('initialState ',store.getState())

const unsubscribe=store.subscribe(()=>{console.log("updated Users" , store.getState())})

store.dispatch(updateUser('Jaunpur'))

unsubscribe()
