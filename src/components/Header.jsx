import img1 from '../images/runsignup_logo.png';
import '../assets/Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="Header">
            <h1 className="name">RunSignup Dynamic Leaderboard</h1>
            <Link to ="../" style={{position: "relative"}}><img className="img-logo" src={img1} alt=""></img></Link>
        </div>
    )
}