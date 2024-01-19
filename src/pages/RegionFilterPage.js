import { useEffect, useRef, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// PreDisplay Component - Page that allows user to set options for the Table Page
const PreDisplayPage = (props) => {
  const { preDisplayUrl, setShowPredisplayPage } = props;

  // When user clicks on "Display Table" this runs
  const openTableWindow = async () => {
    setShowPredisplayPage(false);

    const response = await fetch(preDisplayUrl);

    const data = await response.json();

  {/*
    window.electron.ipcRenderer.sendMessage("create-window", [
      data.individual_results_sets[0].results,
      optionsData,
      preDisplayUrl,
    ]);
  */}
  };

  // Set checkbox value to true or false in the options data
  const handleCheckbox = (e) => {
    const targetKey = e.target.id;

    const oppositeValue = !optionsData[targetKey];

    setOptionsData({
      ...optionsData,
      [targetKey]: oppositeValue,
    });
  };

  // Set user input value to optionsData
  const handleGenericInput = (e) => {
    const targetKey = e.target.id;

    setOptionsData({
      ...optionsData,
      [targetKey]: e.target.value,
    });
  };

  // Default Options Data
  const initialOptionsData = {
    position: true,
    bib: true,
    firstName: true,
    lastName: true,
    finishTime: true,
    scrollSpeed: 5,
    textSize: "Medium",
    startingPlacementRange: 1,
    endingPlacementRange: 100,
  };

  const [optionsData, setOptionsData] = useState(initialOptionsData);

  const {
    position,
    bib,
    firstName,
    lastName,
    finishTime,
    scrollSpeed,
    textSize,
    startingPlacementRange,
    endingPlacementRange,
  } = optionsData;

  return (
    <div className="mt-5 container">
      <h1 className="text-center ">Options</h1>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={position}
          onChange={handleCheckbox}
          id="position"
        />
        <label className="form-check-label" htmlFor="position">
          Position
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={bib}
          onChange={handleCheckbox}
          value=""
          id="bib"
        />
        <label className="form-check-label" htmlFor="bib">
          Bib #
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={firstName}
          onChange={handleCheckbox}
          id="firstName"
        />
        <label className="form-check-label" htmlFor="firstName">
          First Name
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={lastName}
          onChange={handleCheckbox}
          id="lastName"
        />
        <label className="form-check-label" htmlFor="lastName">
          Last Name
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={finishTime}
          onChange={handleCheckbox}
          id="finishTime"
        />
        <label className="form-check-label" htmlFor="finishTime">
          Finish Time
        </label>
      </div>

      <div className="mt-5 d-flex gap-5">
        <label htmlFor="customRange2" className="form-label">
          Scroll Speed
        </label>
        <input
          type="range"
          className="form-range w-75"
          min="1"
          max="10"
          value={scrollSpeed}
          onChange={handleGenericInput}
          id="scrollSpeed"
        />
        <output>{(scrollSpeed / 10) * 100} %</output>
      </div>

      <div className="d-flex align-items-center gap-5 mt-5">
        <label htmlFor="customRange2" className="form-label">
          Text Size
        </label>

        <DropdownButton title={textSize}>
          <Dropdown.Item
            onClick={() =>
              setOptionsData({ ...optionsData, textSize: "Small" })
            }
          >
            Small
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              setOptionsData({ ...optionsData, textSize: "Medium" })
            }
          >
            Medium
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              setOptionsData({ ...optionsData, textSize: "Large" })
            }
          >
            Large
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="d-flex gap-5 align-items-center mt-5">
        <label className="form-label">Placement Range</label>
        <input
          id="startingPlacementRange"
          type="number"
          className="form-control"
          placeholder="Starting Range"
          min="1"
          value={startingPlacementRange}
          onChange={handleGenericInput}
        />
        -
        <input
          type="number"
          className="form-control"
          placeholder="Ending Range"
          min={2}
          id="endingPlacementRange"
          value={endingPlacementRange}
          onChange={handleGenericInput}
        />
      </div>
      <div className="text-center">
        <button
          onClick={openTableWindow}
          className="btn btn-primary mt-5 btn-lg"
        >
          Display Table
        </button>
      </div>
    </div>
  );
};

const TablePage = (props) => {
  // Default options Data
  const initialOptionsData = {
    position: true,
    bib: true,
    firstName: true,
    lastName: true,
    finishTime: true,
    scrollSpeed: 5,
    textSize: "Medium",
    startingPlacementRange: 1,
    endingPlacementRange: 100,
  };

  const [optionsData, setOptionsData] = useState(initialOptionsData);

  {/*
  // Set the optionsData to be the options the user picked in the PreDisplayPage
  window.electron.ipcRenderer.on("set-options", (data) => {
    setOptionsData(data);
  });
*/}

  // Auto Scroll
  useEffect(() => {
    const interval = setInterval(() => {
      // Get the height of the browser
      let documentHeight = document.body.scrollHeight;

      // Get the current scroll position of the browser
      let currentScroll = window.scrollY + window.innerHeight;

      // If the currentScroll is scrolled 100%
      if (currentScroll >= documentHeight) {
        // Scroll back to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll down by 50px
        window.scrollBy({
          top: 50,
          behavior: "smooth",
        });
      }
    }, 2000 - 100 * optionsData.scrollSpeed);

    return () => {
      clearInterval(interval);
    };
  }, [optionsData]);

  // The url to use to refetch live data
  const { refetchUrl } = props;

  // The results to be displayed
  const [resultData, setResultData] = useState([]);
  console.log(resultData);

  // Refetch the result data
  useEffect(() => {
    const refetchResults = async () => {
      const response = await fetch(refetchUrl);
      const data = await response.json();
      setResultData(data.individual_results_sets[0].results);
    };

    if (resultData.length > 0) {
      const interval = setInterval(() => {
        console.log("refetching...");
        refetchResults();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    } else {
      refetchResults();
    }
  }, [refetchUrl, resultData.length]);

  //window.electron.ipcRenderer.sendMessage("save-data", resultData);

  let fontClassName = "fs-5";

  // Decides the font size styling based on the options
  switch (optionsData.textSize) {
    case "Small":
      fontClassName = "fs-6";
      break;
    case "Medium":
      fontClassName = "fs-5";
      break;
    case "Large":
      fontClassName = "fs-4";
      break;
    default:
      fontClassName = "fs-5";
  }

  return (
    <Table striped bordered hover className={fontClassName}>
      <thead>
        <tr>
          {optionsData.position && <th>Position #</th>}
          {optionsData.bib && <th>Bib #</th>}
          {optionsData.firstName && <th>First Name</th>}
          {optionsData.lastName && <th>Last Name</th>}
          {optionsData.finishTime && <th>Finish Time</th>}
        </tr>
      </thead>
      <tbody>
        {/*  Loop through the result data and render their information*/}
        {resultData
          .filter((person) => Number(person.place) > 0)
          .slice(
            optionsData.startingPlacementRange - 1,
            optionsData.endingPlacementRange,
          )
          .map((person) => {
            // If there is no position for the person, don't render them
            if (!person.place) return null;
            return (
              <tr key={person.result_id}>
                {optionsData.position && <th>{person.place}</th>}
                {optionsData.bib && <th>{person.bib}</th>}
                {optionsData.firstName && <th>{person.first_name}</th>}
                {optionsData.lastName && <th>{person.last_name}</th>}
                {optionsData.finishTime && <th>{person.clock_time}</th>}
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

// The initial page to load
const MainPage = () => {
  // Parameters for api call, default api key, secret, and default json format
  const params = `?api_key=fl6UtJPAkHn3jylC2s9P7LQ39eYd489e&api_secret=L3QCcl8zAVa3gM8ONfTsdmRcedCpBLQl&format=json`;

  // Searchbar user input value
  const [inputValue, setInputValue] = useState("");

  const [eventData, setEventData] = useState([]);

  // True or False to when to show the Options Page (PreDisplayPage)
  const [showPredisplayPage, setShowPredisplayPage] = useState(false);

  // Url to use to refetch data
  const [preDisplayUrl, setPreDisplayUrl] = useState("");

  // List of all Races
  const [racesData, setRacesData] = useState([]);

  // Current selected race's ID
  const [currentRaceId, setCurrentRaceId] = useState(null);

  // Search races based on user search input
  useEffect(() => {
    const getRacesData = async () => {
      const nameSearchParam = `&name=${inputValue}`;
      const response = await fetch(
        `https://runsignup.com/rest/races${params}&only_races_with_results=T${
          inputValue.length > 0 ? nameSearchParam : ""
        }`
      );
      const data = await response.json();
      setRacesData(data.races);
    };

    getRacesData();
  }, [inputValue, params]);

  // Runs when user clicks on a race, get it's event data and populate eventData
  async function onSubmit(e, raceId) {
    e.preventDefault();
    const response = await fetch(
      `https://runsignup.com/rest/race/${raceId}/${params}`
    );

    const data = await response.json();

    if (data.race.events) {
      const { events } = data.race;
      setEventData(events);
    }
  }

  // If showPredisplayPage gets set to true, render that Options Page
  if (showPredisplayPage) {
    return (
      <PreDisplayPage
        preDisplayUrl={preDisplayUrl}
        setShowPredisplayPage={setShowPredisplayPage}
      />
    );
  }

  return (
    <div>
      <div className="input-group mb-3">
        <form className="d-flex w-100">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            value={inputValue}
            className="form-control"
            placeholder="Search By Race Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* If there is racesData, render a list of all the races by names */}
      {racesData && eventData.length < 1 && (
        <ListGroup>
          {racesData.map((race) => {
            return (
              <ListGroup.Item
                key={race.race.race_id}
                onClick={(e) => {
                  // When user clicks on the race name
                  setCurrentRaceId(race.race.race_id);
                  // Populate event data
                  onSubmit(e, race.race.race_id);
                }}
              >
                {race.race.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}

      { /* If there is event data, render a list of events by name and date */}
      {eventData && (
        <ListGroup>
          {eventData.map((event) => {
            return (
              <ListGroup.Item
                key={event.event_id}
                onClick={async () => {
                  // open predisplaypage
                  setShowPredisplayPage(true);

                  const url = `https://runsignup.com/rest/race/${currentRaceId}/results/get-results${params}&event_id=${event.event_id}`;
                  setPreDisplayUrl(url);
                }}
              >
                {event.name} - {event.start_time}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
};

export default function App() {
  const [resultData, setResultData] = useState([]);
  const [refetchUrl, setRefetchUrl] = useState(null);

  // When electron uploads data to a new window, it means there is data to display,
  // therefor resultData gets populated and the Table component is rendered instead
  // of the MainPage
  {/*window.electron.ipcRenderer.on("get-data", (data) => {
    const [tableData, refetchUrl] = data;
    setResultData(tableData);
    setRefetchUrl(refetchUrl);
  });
*/}

  // If data has been uploaded from electron, load that data with the Table componenent
  if (resultData.length > 0) {
    return <TablePage refetchUrl={refetchUrl} />;
  } else {
    return <MainPage />;
  }
}
