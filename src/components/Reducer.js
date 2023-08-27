const busyBuyReducer = (state, action) => {
    const {payload} = action;
    if(action.type === 'setData'){
        return {
            ...state,
            [payload.state]: payload.value
        };
    } else if(action.type === 'add'){
        return{
            ...state,
            [payload.state]: [payload.value , ...state[payload.state]]
        }
    } else if (action.type === 'remove'){
        return{
            ...state,
            [payload.state]: state[payload.state].filter((el)=> el !== payload.value)
        }
    }   
}

export default busyBuyReducer;