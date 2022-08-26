const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    data: [],
    error: ""
};

const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const REQUEST = "REQUEST";

const fetchRequest = () => {
    return {
        type: REQUEST
    }
}
const fetchSuccess = (arr) => {
    return {
        type: SUCCESS,
        response: arr
    }
}

const fetchFailure = (error) => {
    return {
        type: FAILURE,
        response: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST:
            return {
                ... state,
                loading: true
            }
        case FAILURE:
            return {
                loading: false,
                data: [],
                error: action.response
            }
        case SUCCESS:
            return {
                loading: false,
                data: action.response,
                error: ""
            }
    }
}

const fetchData = () => {
    return function (dispatch) {
        dispatch(fetchRequest());
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
            dispatch(fetchSuccess(res.data));
        }).catch((err) => {
            dispatch(fetchFailure(err));
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    console.log(store.getState())
});

store.dispatch(fetchData())