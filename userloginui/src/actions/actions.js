import axios from 'axios';
export function fetchData() {
    return function(dispatch) {
        dispatch({ type: 'FETCH_JSON_START' })
        axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then(res => {
                dispatch({ type: 'FETCH_JSON_SUCCESS', payload: res.data })
            })
            .catch(error => {
                dispatch({ type: 'FETCH_JSON_FAILED', payload: error })
            })
    }
}


export function createUser(name, email, password) {
    var body = {
        name: name,
        email: email,
        password: password
    }

    return function(dispatch) {
        dispatch({ type: 'FETCH_JSON_START' })
        axios({
                method: 'post',
                url: '/user/create',
                data: body
            })
        	.then(res => {
        		dispatch({ type: 'FETCH_JSON_SUCCESS', payload: res })
        		console.log(res);

        	})
            .catch(err => {
            	 dispatch({ type: 'FETCH_JSON_FAILED', payload: err })
            	 console.log(err);
            })
    }
}