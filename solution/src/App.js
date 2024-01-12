import './App.css';
import React, {useEffect, useState} from 'react';
import { getLocations, isNameValid } from './mock-api/apis';

// Treating "App" as the component since it's the only component, and already contained by index.js
// Single pages can be much larger than this, but I'd modularize any reusable functionality needed by related pages (ex. grids)

function App() {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [gridData, setGridData] = useState([{}, {}, {}, {}, {}]);
  const [isNameError, setIsNameError] = useState(false);

  /* ------- App logic and helpers -------*/

  useEffect(() => {
    const fetchResults = async () => {
      let results = await getLocations();
      setLocationOptions(results);
      setLocation(results[0]);
    };
    try {
      fetchResults();
    }
    catch (err) {
      console.error(`Error loading locations via mock API: ${err}`);
    }
  }, []);

  const checkIsValidName = async (strName) => {
    try {
      // mock API acts a bit oddly because of the setTimeout, but does work for 'invalid name'
      let result = await isNameValid(strName);
      setIsNameError(result ? false : true);
    }
    catch (err) {
      console.error(`Error validating name via mock API: ${err}`);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (name) {
      checkIsValidName(name);
    } else {
      setIsNameError(false);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Note: Clear button functionality was not specified, so for now, it clears everything
  const handleClearBtnClick = () => {
    setName('');
    setLocation(locationOptions[0] || '');
    setIsNameError(false);
    setGridData([{}, {}, {}, {}, {}]);
  };

  const handleAddBtnClick = (e) => {
    e.preventDefault();
    // Doing a check against the grid names here, since IsValidName is pretty limited in its scope
    const nameAlreadyExists = gridData.some((gridItem) => gridItem.name === name);
    if (nameAlreadyExists) {
        setIsNameError(true);
    } else if (name && location && !isNameError) {
      // Handle display of empty rows for visual clarity
      if (Object.keys(gridData[gridData.length - 1]).length === 0) {
        let oldGridData = Array.from(gridData);
        oldGridData.pop();
        oldGridData.unshift({ name: name, location: location })
        setGridData(oldGridData);
      } else {
        setGridData([...gridData, { name: name, location: location }]);
      }
      setName('');
      setLocation(locationOptions[0] || '');
      setIsNameError(false);
    }
  };

  /* ------- JSX -------*/

  const nameInputField = (
    <div className="name-container">
      <label>Name </label>
      <input type="text" value={name} onChange={handleNameChange} />
    </div>
  );

  const nameErrorDisplay = (
    <div className="input-name-error">
      {isNameError ? 'this name has already been taken' : ''}
    </div>
  );

  const locationInputField = (
    <div className="location-container">
      <label>Location </label>
      <select value={location} onChange={handleLocationChange}>
        {locationOptions.length > 0 ? locationOptions.map((locationOption) => (
          <option key={locationOption} value={locationOption}>
            {locationOption}
          </option>
        )) : null}
      </select>
    </div>
  );

  const clearBtn = (
    <div>
      <button onClick={handleClearBtnClick}>Clear</button>
    </div>
  );

  const addBtn = (
    <div>
      <button onClick={handleAddBtnClick}>Add</button>
    </div>
  );

  const btnContainer = (
    <div className="btn-container">
      {clearBtn}
      {addBtn}
    </div>
  );

  const gridTable = (
    <div className="grid-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {gridData.length > 0 ? gridData.map((gridItem, index) => (
            <tr key={index}>
              <td>{gridItem.name}</td>
              <td>{gridItem.location}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );

// The prior JSX compartmentalization makes for a clean, readable component return!
  return (
    <>
      <div className="view-container">
        {nameInputField}
        {nameErrorDisplay}
        {locationInputField}
        {btnContainer}
        {gridTable}
      </div>
    </>
  );
};

export default App;
