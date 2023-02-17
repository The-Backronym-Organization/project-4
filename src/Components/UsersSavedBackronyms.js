
const UsersSavedBackronyms = () => {


    return (
        <>
            <h2>LOGGED IN</h2>
            {/* {isLoading ? <Loading /> : (
                <ul className='savedBackronyms'>
                    {backronymDb.map((backronym) => {
                        return (
                            <li className='savedBackronym' key={backronym.key}>
                                <p>
                                    {backronym.data.map((letter) => {
                                        return (<><span>{`${letter[0].word} `.slice(0, 1).toUpperCase()}</span>{`${letter[0].word} `.slice(1).toLowerCase()}</>)
                                    })}
                                </p>
                                <button className='delete' onClick={() => handleTrash(backronym)}><FaTrash /></button>
                            </li>
                        )
                    })}
                </ul>
            )} */}
        </>

    )
};

export default UsersSavedBackronyms;