import firebase from '../firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, push, remove, set } from 'firebase/database';
const Results = ({ results, activeKey, endpoint}) => {
    const [liked, setLiked] = useState(false);
    const [backronymToDisplay, setBackronymToDisplay] = useState([]);
    const [randomize, setRandomize] = useState(false);
    const [currentBackronymKey, setCurrentBackronymKey] = useState("");
    
    useEffect(() => {
        const backronymResult = results.map((letterArr) => {
            const backronymArray = [];
            for (let i = 0; i < 1; i++) {
                backronymArray.push(randomItem(letterArr));
            }
            return backronymArray;
        })
        setBackronymToDisplay(backronymResult);
    }, [randomize, results]);

    const randomItem = (array) => {
        setLiked(false);
        const randomNumber = Math.floor(Math.random() * array.length);
        return array[randomNumber];
    }
    const handleLike = () => { 
        setLiked(true);
        const database = getDatabase(firebase)
        //push backronym to database
        //save key from current backronym to state
        const dbBackronym = push(ref(database, endpoint + activeKey), backronymToDisplay)
        //setCurrentBackronymKey(dbKey.key);
        setCurrentBackronymKey(dbBackronym.key);
    }
      
    const handleUnlike = () => {
        setLiked(false);
        // create a variable that holds our database details
        const database = getDatabase(firebase);
        // create a variable that makes a reference to the current liked backronym
        const dbRef = ref(database, endpoint + activeKey +`/${currentBackronymKey}`);
        //remove it from the database
        remove(dbRef);
        setCurrentBackronymKey("");
    }
    const handleRandom = () => {
        setRandomize(!randomize);
    };
    return (
        <section className="activeResult">
            <ul className="activeBackronym">
                {backronymToDisplay.map((index, i) => {
                    return <li key={`${index[0]?.score}${i}`}>{index[0]?.word}</li>
                })}
            </ul>
            <div className="buttons">
                <button >
                    {liked ?
                        <i className="fa-solid fa-heart" onClick={handleUnlike}></i>
                        : <i className="fa-regular fa-heart" onClick={handleLike}></i>}
                </button>
                <button onClick={handleRandom}><i className="fa-solid fa-arrows-rotate"></i></button>
            </div>
        </section>
    );
}
export default Results;