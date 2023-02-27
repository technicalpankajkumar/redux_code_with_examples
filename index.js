const {legacy_createStore, bindActionCreators}=require('redux')
const createStore=legacy_createStore
//action creator // how to perform
const cakeOfOrder=(qty=1)=>{
    return {
        type:'CAKE_ORDERED',        //action type 
        payload:qty
    }
}

const cakeOfRestock=(qty = 1)=>{
    return {
        type:'CAKE_RESTOCKED',
        payload:qty,
    }
}

const iceCreamOrder=(qty=0)=>{
    return {
        type:'ICECREAM_ORDERED',
        payload:qty
    }
}

const iceCreamRestock=(qty=10)=>{
    return {
        type:'ICECREAM_RESTOCKED',
        payload:qty
    }
}

//reducer // how to work
const initialState={
    numOfOrder:10,
    numOfIcecream:50
}
const reducer=(state=initialState,action)=>{
    switch (action.type){
        case 'CAKE_ORDERED':
            return{
                ...state,
                numOfOrder:state.numOfOrder - action.payload
            }
        case 'CAKE_RESTOCKED':
            return{
                ...state,
                numOfOrder: state.numOfOrder + action.payload,
            }
        case 'ICECREAM_ORDERED':
            return {
                ...state,
                numOfIcecream:state.numOfIcecream - action.payload
            }
        case 'ICECREAM_RESTOCKED':
            return {
                ...state,
                numOfIcecream: state.numOfIcecream + action.payload
            }
        default:
            return state;
    }
}

const store=createStore(reducer)

console.log('initialState: ',store.getState())

const unsubscribe=store.subscribe(()=>console.log('update State: ', store.getState()))

/* store.dispatch(cakeOfOrder())
store.dispatch(cakeOfOrder({
    type:'CAKE_ORDERED',
}))
store.dispatch(cakeOfOrder())
store.dispatch(cakeOfOrder())

store.dispatch(cakeOfRestock(5))
*/

const actions= bindActionCreators({cakeOfOrder,cakeOfRestock, iceCreamOrder, iceCreamRestock},store.dispatch)

console.log('Order of Cakes')
actions.cakeOfOrder(2)
actions.cakeOfOrder(2)
actions.cakeOfOrder(4)
console.log("Restock Cake Item")
actions.cakeOfRestock(100)
console.log("............")
actions.cakeOfOrder()
actions.cakeOfOrder()

console.log("Order of IceCreams ")
actions.iceCreamOrder(5)
actions.iceCreamOrder(15)
actions.iceCreamOrder(5)
console.log("Restock of IceCreams")
actions.iceCreamRestock(100)
console.log("...............")


unsubscribe()