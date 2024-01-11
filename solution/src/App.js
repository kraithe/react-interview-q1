import './App.css';
import React, {useEffect, useState} from 'react';
import { getLocations, isNameValid } from './mock-api/apis';

// Treating "App" as the component since it's the only component, and already contained by index.js
// Single pages can be much larger than this, but I'd modularize any reusable functionality needed by related pages

function App() {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [isNameError, setIsNameError] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      let results = await getLocations();
      setLocationOptions(results);
      console.log(`Location options: ${results}`);
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
      let result = await isNameValid(strName);
      setIsNameError(result ? true : false);
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

  // Note: Clear button functionality was not specified, so for now it clears everything
  const handleClearBtnClick = () => {
    setName('');
    setLocation(locationOptions[0] || '');
    setIsNameError(false);
    setGridData([]);
  };

  const handleAddBtnClick = (e) => {
    e.preventDefault();
    const nameAlreadyExists = gridData.some((gridItem) => gridItem.name === name);
    if (nameAlreadyExists) {
        setIsNameError(true);
    } else if (name && location && !isNameError) {
        setGridData([...gridData, { name: name, location: location }]);
        setName('');
        setLocation(locationOptions[0] || '');
        setIsNameError(false);
    }
  };

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
  )

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
}

export default App;
