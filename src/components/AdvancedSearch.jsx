import { SearchBar } from './SearchBar';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import '../assets/SearchBar.css';
import '../assets/AdvancedSearch.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function AdvancedSearch() {

    const navigate = useNavigate();

    const baseURL = `/races?`;
    const [parameters, setParameters] = useState([]);

    const [selectedDate, setSelectedDate] = useState('');
    const handleDate = (date) => {
        setSelectedDate(date);
        if(date !== "--") {
            let formattedDate = JSON.stringify(date);
            formattedDate = formattedDate.substring(1,11);
            setParameters((arr) => [...arr.filter(str => !str.includes("start_date")), `start_date=${formattedDate}`]);
        }
        else{
            setParameters(arr => arr.filter(str => !str.includes("start_date")))
        }
    };

    const [selectedCountry, setSelectedCountry] = useState('');
    const handleCountry = (country_code) => {
        setSelectedCountry(country_code.target.value);
        if(country_code.target.value !== "--") {
            setParameters((arr) => [...arr.filter(str => !str.includes("country_code")), `country_code=${country_code.target.value}`])
        }
        else{
            setParameters(arr => arr.filter(str => !str.includes("country_code")))
        }
    }

    const [selectedState, setSelectedState] = useState('');
    const handleState = (state) => {
        setSelectedState(state.target.value);
        if(state.target.value !== "--") {
            setParameters((arr) => [...arr.filter(str => !str.includes("state")), `state=${state.target.value}`])
        }
        else{
            setParameters(arr => arr.filter(str => !str.includes("state")))
        }
    }

    const [selectedCity, setSelectedCity] = useState('');
    const handleCity = (city) => {
        setSelectedCity(city.target.value);
        if(city.target.value !== "") {
            setParameters((arr) => [...arr.filter(str => !str.includes("city")), `city=${city.target.value}`])
        }
        else{
            setParameters(arr => arr.filter(str => !str.includes("city")))
        }
    }

    const [selectedName, setSelectedName] = useState('');
    const handleName = (name) => {
        setSelectedName(name.target.value);
        if(name.target.value !== "") {
            setParameters((arr) => [...arr.filter(str => !str.includes("name")), `name=${name.target.value}`])
        }
        else{
            setParameters(arr => arr.filter(str => !str.includes("name")))
        }
    }

    const stateOptions = ["--", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
        "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    const countryOptions = ["--", "US", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB",
        "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF",
        "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE",
        "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP",
        "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT",
        "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT",
        "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW",
        "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL",
        "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK",
        "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR",
        "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"];

    return (
        <div>
            <SearchBar />
            <br></br>
            <div className='form-container'>
                <div className='advancedSearch'>
                    <form class='moved-form' onSubmit={(e) => { e.preventDefault(); navigate(baseURL+parameters.join("&"))}}>

                        <label for="name"><span className="asterisk">*</span>Name:</label>
                        <input value={selectedName} onChange={handleName} class="short-textbox" id="name" name="name"></input>

                        <label for="country_code">Country:</label>
                        <select value={selectedCountry} onChange={handleCountry} class='styled-dropdown' id="country_code" name="country_code">
                            {
                                countryOptions.map((country_code) =>
                                    <option value={country_code} >
                                        {country_code}
                                    </option>
                                )
                            }
                        </select>

                        <label for="states">State:</label>
                        <select value={selectedState} onChange={handleState} name="state" class='styled-dropdown' id="state">
                            {
                                stateOptions.map((states) =>
                                    <option value={states}>
                                        {states}
                                    </option>
                                )
                            }
                        </select>
                        <br></br>
                        <label for="city">City:</label>
                        <input value={selectedCity} onChange={handleCity} class="short-textbox" id="city" name="city"></input>

                        <div>
                            <label for="start_date">Start Date:</label>
                            <DatePicker
                                id="start_date"
                                name="start_date"
                                selected={selectedDate}
                                onChange={handleDate}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div class="button-container">
                            <button type="submit" class='styled-button'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};