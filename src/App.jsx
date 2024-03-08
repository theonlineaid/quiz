import React, { useEffect, useReducer } from 'react';

import Head from './components/Head';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import QuizStart from './components/QuizStart';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';


// Initial state
const initialState = {
  data: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0
};

// Reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return { ...state, status: "loading", error: null };
    case "Success":
      return { ...state, status: "success", data: action.payload };
    case "Error":
      return { ...state, status: "error", error: action.payload };
    case "Start":
      return { ...state, status: "active" };
    case "NewAnswer":
      const question = state.data.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points
      };

    case "NextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      return state;
  }
};

/**
 * This function returns the main component of the application.
 * @returns {JSX.Element} The main component of the application.
 */
function App() {
  const [{ data, status, index, answer, points }, dispatch] = useReducer(dataReducer, initialState);

  const numOfQuestion = data.length;
  const maxPossiblePoints = data.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "Loading" });

      try {
        const response = await fetch('http://localhost:5000/questions');
        const result = await response.json();

        dispatch({ type: "Success", payload: result });

      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: "Error", payload: 'Error fetching data' });
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Head />
      <Main>

        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "success" && <QuizStart length={numOfQuestion} dispatch={dispatch} />}

        {status === "active" && <>

          <Progress index={index} length={numOfQuestion} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />

          <Question question={data[index]} dispatch={dispatch} answer={answer} />

          <NextButton dispatch={dispatch} answer={answer} />

        </>}
      </Main>
    </>
  );
}

export default App;
