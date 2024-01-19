import img1 from '../images/runsignup_logo.png';
import '../assets/Header.css';

export default function Header() {
    return (
        <div className="Header">
            <h1 className="name">RunSignup Dynamic Leaderboard</h1>
            <a href="./"><img className="logo" src={img1} alt=""></img></a>
        </div>
    )
}