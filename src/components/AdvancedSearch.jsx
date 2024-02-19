import './SearchBar.css';
import './AdvancedSearch.css';
import { SearchBar } from './SearchBar';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import '../components/AdvancedSearch.css';
import 'react-datepicker/dist/react-datepicker.css';


export default function AdvancedSearch() {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (date) => {
        setSelectedDate(date);
    };

    const stateOptions = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
        "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    const countryOptions = ["US", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB",
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
                    <form>

                        <label for="countries">Country:</label>
                        <select name="country-codes" id="country-codes">
                            {
                                countryOptions.map((countries) =>
                                    <option value={countries}>
                                        {countries}
                                    </option>
                                )
                            }
                        </select>

                        <label for="states">State:</label>
                        <select name="state" id="state">
                            {
                                stateOptions.map((states) =>
                                    <option value={states}>
                                        {states}
                                    </option>
                                )
                            }
                        </select>

                        <label for="city">City:</label>
                        <input type="text" id="city" name="city"></input>

                        <div>
                            <label for="calendar">Start Date:</label>
                            <DatePicker
                                id="calendar"
                                selected={selectedDate}
                                onChange={handleChange}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div class="button-container">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>






        </div>
    );
};