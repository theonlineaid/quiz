import React, { useEffect, useReducer } from 'react';

import Head from './components/Head';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import QuizStart from './components/QuizStart';
import Question from './components/Question';

// Action types
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

// Initial state
const initialState = {
  // loading: false,
  // error: null,
  data: [],
  status: 'loading',

  index: 0
};

// Reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, status: "loading", error: null };
    case FETCH_SUCCESS:
      return { ...state, status: "success", data: action.payload };
    case FETCH_FAILURE:
      return { ...state, status: "error", error: action.payload };
    case "STARTING":
      return { ...state, status: "active", error: null };
    default:
      return state;
  }
};

/**
 * This function returns the main component of the application.
 * @returns {JSX.Element} The main component of the application.
 */
function App() {
  const [{ data, status, index }, dispatch] = useReducer(dataReducer, initialState);

  const numOfQuestion = data.length;

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
      <Head />
      <Main>
        {/* {state.loading && <p>Loading...</p>} */}
        {/* {state.error && <p>Error: {state.error}</p>}
        {state.data && <p>Data: {JSON.stringify(state.data)}</p>} */}

        {/* <QuizStart /> */}

        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "success" && <QuizStart length={numOfQuestion} dispatch={dispatch} />}

        {status === "active" && <Question question={data[index]} />}
      </Main>
    </>
  );
}

export default App;
