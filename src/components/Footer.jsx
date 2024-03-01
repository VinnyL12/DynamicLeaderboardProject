import rLogo from '../images/r-logo.png';
import '../assets/Footer.css';

export default function Footer() {
    return (
        <div className="Footer">
            <img style={{position: "relative"}} className="r-logo" src={rLogo} alt=""></img>
        </div>
    )
}