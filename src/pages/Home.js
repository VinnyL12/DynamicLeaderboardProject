import Header from "../components/Header"
import Navbar from "../components/Navbar"
import '../assets/Home.css';

import runners1 from '../images/Runner1.jpg';
import runners2 from '../images/Runner2.jpg';

export default function Home() {

    return (
        <>
            <Header />
            <Navbar />

            <div>
                <div className="column left">
                    <h2 align="center">Welcome to the RunSignup Dynamic Leaderboard!</h2>
                    <ul class="a">
                        <li><span><h4>This web application allows users to navigate to their desired race and view all relevant race statistics.</h4></span></li>
                        <li><span><h4>Entering the desired race name into the Search Bar will navigate you to your desired race.</h4></span></li>
                        <li><span><h4>From there, users can select the desired event they would like to view.</h4></span></li>
                        <li><span><h4>Upon selecting that event, users will be sent to the invidual race statistics page of the given event.</h4></span></li>
                        <li><span><h4>From there, users can navigate to the team statistics page as well.</h4></span></li>
                        <li><span><h4>Respectively, each leaderboard can be enlarged and cast onto larger screens if the user desires.</h4></span></li>

                    </ul>
                </div>

                <div className="column right">
                    <img src={runners1} alt="" class="center"></img>
                    <img src={runners2} alt="" class="center"></img>
                </div>
            </div>


        </>
    )
}