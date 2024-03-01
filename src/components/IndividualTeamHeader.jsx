import { Link } from 'react-router-dom';
import '../assets/IndividualTeamHeader.css';

export default function IndividualTeamHeader({ state, individual, individual_id}) {
    return (
        <div>
            { individual ?
                <div>
                    <div className="individualteamcolumnleft selected">
                        <h4>Individual Results</h4>
                    </div>
                    <Link to='/team' state={{...state, individual_id}}>
                        <div className="individualteamcolumnright">
                            <h4>Team Results</h4>
                        </div>
                    </Link>
                </div> :
                <div>
                    <Link to={"/individual/" + individual_id} state={{...state}}>
                        <div className="individualteamcolumnleft selected">
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