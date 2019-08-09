export default function create(state = {
    fetching: false,
    fetched: false,
    data: [],
    error: null
}, action) {
    switch (action.type) {
    	case 'FETCH_JSON_START' : {
    		return {...state, fetching:true}
    	}
    	case 'FETCH_JSON_SUCCESS' : {
    		return {...state, fetching:false, fetched: true, data: action.payload}
    	}
    	case 'FETCH_JSON_FAILED' : {
    		return {...state, fetching:false, fetched: false, data:[], error: action.payload}
    	}
    	default : {
    		return {...state}
    	}
    }
}