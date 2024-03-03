import React, { useEffect, useReducer } from 'react';
import Header from './Header/Head';
import Main from './Header/Main';

// Action types
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

// Reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  loading: false,
  data: null,
  error: null,
};

/**
 * This function returns the main component of the application.
 * @returns {JSX.Element} The main component of the application.
 */
function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_REQUEST });

      try {
        const response = await fetch('http://localhost:5000/questions');
        const result = await response.json();

        dispatch({ type: FETCH_SUCCESS, payload: result });

      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: FETCH_FAILURE, payload: 'Error fetching data' });
      }
    };

    fetchData();
  }, []); // Empty dependency array, as fetchData does not depend on any variable within the useEffect block

  return (
    <>
      <Header />
      <Main>
        {state.loading && <p>Loading...</p>}
        {state.error && <p>Error: {state.error}</p>}
        {state.data && <p>Data: {JSON.stringify(state.data)}</p>}
      </Main>
    </>
  );
}

export default App;
