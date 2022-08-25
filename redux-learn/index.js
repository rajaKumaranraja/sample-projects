const redux = require("redux");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE = "BUY_ICECREAMS";
const BUY_JUICE = "BUY_JUICES";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "first redux action"
    }
}

function buyIceCreams() {
    return {
        type: BUY_ICE
    }
}

function buyJuices() {
    return {
        type: BUY_JUICE
    }
}

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 50
}

const stateForJuice = {
    numOfJuices: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ... state,
                numOfCakes: state.numOfCakes - 1
            }
        case BUY_ICE:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default: return state
    }
}

const juiceReducer = (state = stateForJuice, action) => {
    switch (action.type) {
        case BUY_JUICE: return {
            ... state,
            numOfJuices: state.numOfJuices - 1
        }

        default: return state
    }
}

const rootReducer = combineReducers({
    cakeIce: reducer,
    juice: juiceReducer
})

const store = createStore(rootReducer);

const unSubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(buyIceCreams());
store.dispatch(buyCake());
store.dispatch(buyJuices());

unSubscribe();