import Fire from '../assets/fire-trail_720.png';
import Delorean from '../assets/Delorean.png';

const Loading = () => {
    return (
        <div className="loading">
        <img src={Delorean} alt='Delorean driving back and fourth over fire' className='delorean'/>
        <img src={Fire} className='fire' />
        </div>
    )
};

export default Loading;