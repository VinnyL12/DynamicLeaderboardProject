import '../assets/IndividualTeamHeader.css';
import { Link } from 'react-router-dom';

export default function IndividualTeamHeader({ individualClass, teamClass, state, teamDisabled, teamLink, individualLink, race_id, individual_id }) {
    console.log(race_id);
    console.log("State " + state);

    return (
        <>
            {!teamDisabled ?
                <div className="header-wrapper">
                    <Link className='link-header' to={individualLink} state={{ ...state }}>
                        <div className={individualClass}>
                            <h4>Individual Results</h4>
                        </div>
                    </Link>
                    <Link className='link-header' to={teamLink} state={{ ...state, individual_id }}>
                        <div className={teamClass}>
                            <h4>Team Results</h4>
                        </div>
                    </Link>
                </div> :
                <div className="header-wrapper">
                    <Link className='link-header' to={individualLink} state={{ ...state }}>
                        <div className={individualClass}>
                            <h4>Individual Results</h4>
                        </div>
                    </Link>
                    <div className="individualteamcolumnright">
                        <h4>Team Results</h4>
                    </div>
                </div>
            }
        </>
    )
}