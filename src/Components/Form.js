const Form = ({ handleSubmit, setInput, input, context, setContext, validInput}) => {
    return(
        <form
        onSubmit={handleSubmit}>
            <label htmlFor='acronym' className='sr-only'>Enter a Word</label>
            <input 
            className={validInput ? 'glow' : 'invalid-input'} 
            type='text'
            id ='acronym' 
            placeholder='Enter a Word'
            onChange={(e)=> setInput(e.target.value)}
            value={input}/>
            <label htmlFor='context' className='sr-only'>Context</label>
            <input 
            type='text'
            id ='context' 
            placeholder='Context'
            onChange={(e)=> setContext(e.target.value)}
            value={context}/>
            <button 
            type='submit' 
            className='doNotPush'
            >Do Not Push! </button>
        </form>
    )
}
export default Form;