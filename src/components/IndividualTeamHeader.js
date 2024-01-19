import '../assets/IndividualTeamHeader.css';

export default function IndividualTeamHeader() {
    return (
        <div>
            <div className="individualteamcolumnleft">
                <h4><a href="./individual">Individual Results</a></h4>
            </div>

            <div className="individualteamcolumnright">
                <h4><a href="./team">Team Results</a></h4>
            </div>
        </div>
    )
}