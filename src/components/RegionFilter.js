import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import Selector from "./Selector";
//import '../assets/Region.css';
//import "tailwindcss/tailwind.css";
//require('../assets/Region.css')

const RegionFilter = () => {
    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();

    const [country, setCountry] = useState(countryData[0]);
    const [state, setState] = useState();
    const [city, setCity] = useState();

    useEffect(() => {
        setStateData(State.getStatesOfCountry(country?.isoCode));
    }, [country]);

    useEffect(() => {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }, [state]);

    useEffect(() => {
        stateData && setState(stateData[0]);
    }, [stateData]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);

    return (
            <div>
                <br />
                <div className="flex flex-wrap gap-3 bg-teal-300 rounded-lg p-8">
                    <div>
                        <p className="text-teal-800 font-semibold">Country :</p>
                        <Selector
                            data={countryData}
                            selected={country}
                            setSelected={setCountry}
                        />
                    </div>
                    {state && (
                        <div>
                            <p className="text-teal-800 font-semibold">State :</p>
                            <Selector
                                data={stateData}
                                selected={state}
                                setSelected={setState}
                            />
                        </div>
                    )}
                    {city && (
                        <div>
                            <p className="text-teal-800 font-semibold">City :</p>
                            <Selector data={cityData} selected={city} setSelected={setCity} />
                        </div>
                    )}
                </div>
            </div>
    );
};

export default RegionFilter;