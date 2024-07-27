import sun from '../../assets/img/Sun.svg';
import moon from '../../assets/img/Moon.svg';
import '../../scss/components/Toggle.css';

const Toggle = ({ handleChange, isChecked }) => {
    return (
        <div className='toggle-container'>
            <input
                type="checkbox"
                id="check"
                className='toggle'
                onChange={handleChange}
                checked={isChecked}
            />
            <label className='toggle-label' htmlFor="check">
                <img src={sun} alt="Sole" className="sun" />
                <img src={moon} alt="Luna" className="moon" />
            </label>
        </div>
    );
}

export default Toggle;