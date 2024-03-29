import '../assets/Footer.css';
import rLogo from '../images/r-logo.png';

export default function Footer() {
    return (
        <div className="Footer">
            <img style={{position: "relative"}} className="r-logo" src={rLogo} alt=""></img>
        </div>
    )
}