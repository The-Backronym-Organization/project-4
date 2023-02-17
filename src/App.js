// Modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, Link } from "react-router-dom";

// Components
import Header from './Components/Header'
import Form from './Components/Form';
import Results from './Components/Results';
import SavedBackronyms from './Components/SavedBackronyms';
import UsersSavedBackronyms from './Components/UsersSavedBackronyms';
import Login from './Components/Login';

import Loading from './Components/Loading';
import BadInput from './Components/BadInput';
import Error404 from './Components/Error404';



// style sheets
import './App.scss';

function App() {
  const [theme, setTheme] = useState('dark');
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const [context, setContext] = useState('')
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [validInput, setValidInput] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validInput = /^[A-Za-z]{2,6}$/
    if (validInput.test(input)) {
      setValidInput(true);
      setWord(input);
      setInput('');
      navigate('/backronym');
      setContext('')
    } else {
      setResults([])
      setWord('');
      setValidInput(false);
    }
  }

  useEffect(() => {
    if (word.length === 0) return;
    setIsLoading(true);
    const inputLetterArray = [...word];
    const fetchWord = async (letter) => {
      try{
        const wordArray = await
        axios({
          url: 'https://api.datamuse.com/words',
          params: {
            ml: context,
            sp: `${letter}*`
          },
        })
        return wordArray.data
      }catch(error){
          console.log('hit error', error)
          return [];
      }
    }
    const getWordsByLetter = async () => {
      const results = await Promise.all(inputLetterArray.map(letter => {
  
        return (fetchWord(letter));
      })
      )
      setResults(results);
      setIsLoading(false);
      console.log(results)
    }
    getWordsByLetter();

  }, [word]);

  // LIGHT/DARK FUNCTION
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <div className='wrapper'>
        <Link to="/">
         <Header 
        toggleTheme={toggleTheme}
        theme={theme}/>
        <Login
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        />
        </Link>
        <Routes>
          <Route path='/' element={
            <>
              <Form 
                validInput={validInput}
                handleSubmit={handleSubmit} 
                setInput={setInput} 
                input={input} 
                context={context} 
                setContext={setContext}/>
              {validInput ? null : <BadInput />}
              {isLoggedIn ? <UsersSavedBackronyms /> : <SavedBackronyms />}
            </>
          } />

          <Route path='backronym' element={
            <>
              <Form 
                handleSubmit={handleSubmit} 
                setInput={setInput} 
                input={input} 
                context={context} 
                setContext={setContext}/>
              {validInput ? (isLoading ? <Loading /> : <Results results={results} user={user} />) : (<BadInput />)}
              {isLoggedIn ? <UsersSavedBackronyms /> : <SavedBackronyms />}
            </>
          } />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
