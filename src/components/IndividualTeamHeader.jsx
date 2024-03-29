import '../assets/IndividualTeamHeader.css';
import { Link } from 'react-router-dom';

export default function IndividualTeamHeader({ individualClass, teamClass, state, teamDisabled, teamLink, individualLink, race_id, individual_id }) {
    console.log(race_id);
    console.log("State " + state);

    return (
        <div className="header-wrapper">
            {!teamDisabled ?
                <div>
                    <Link to={individualLink} state={{ ...state }}>
                        <div className={individualClass}>
                            <h4>Individual Results</h4>
                        </div>
                    </Link>
                    <Link to={teamLink} state={{ ...state, individual_id }}>
                        <div className={teamClass}>
                            <h4>Team Results</h4>
                        </div>
                    </Link>
                </div> :
                <div>
                    <Link to={individualLink} state={{ ...state }}>
                        <div className={individualClass}>
                            <h4>Individual Results</h4>
                        </div>
                    </Link>
                    <div className="individualteamcolumnright">
                        <h4>Team Results</h4>
                    </div>
                </div>
            }
        </div>
    )
}