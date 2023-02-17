import firebase from '../firebase';
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import Loading from './Loading';
import {FaTrash} from 'react-icons/fa'


const SavedBackronyms = ({activeKey, endpoint}) => {
    const [backronymDb, setBackronymDb] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const database = getDatabase(firebase);
        const dbRef = ref(database, endpoint + activeKey);
        console.log(dbRef)
        onValue(dbRef, (response) => {
            const newState = [];
            // .val() is a Firebase method that gets us the information we want
            const data = response.val();
            console.log(data)
            // data is an object, so we iterate through it using a for in loop to access each backronym
            console.log(activeKey)
            for (let key in data[activeKey]) {
                // inside the loop, we push each item name to an array we already created inside the onValue() function called newState
                newState.push({ key: key, data: data[key] });
            }
            // then, set to state
            setBackronymDb(newState);
            console.log(backronymDb, newState)
            setIsLoading(false);
        });
    }, []);
    useEffect(()=>{
        console.log(backronymDb)

    },[backronymDb])

    const handleTrash = (backronym) => {
        const database = getDatabase(firebase);
        // create a variable that makes a reference to the current liked backronym
        const dbRef = ref(database, endpoint + activeKey +`/${backronym.key}`);
        //remove it from the database
        remove(dbRef);
    };

    return (
        <>
            <h2>Dashboard</h2>
        { isLoading ? <Loading /> : (
             <ul className='savedBackronyms'>
                {/* {backronymDb.map((backronym) => {
                    return (
                        <li className='savedBackronym' key={backronym.key}>
                            <p>
                            {backronym.data.map((letter) => {
                                return(<><span>{`${letter[0].word} `.slice(0, 1).toUpperCase()}</span>{`${letter[0].word} `.slice(1).toLowerCase()}</>)
                            })}
                            </p>
                            <button className='delete' onClick={() => handleTrash(backronym)}><FaTrash /></button>
                        </li>
                    )
                })} */}
            </ul>
        ) }
        </>

    )
};

export default SavedBackronyms;