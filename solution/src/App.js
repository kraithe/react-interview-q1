import logo from './logo.svg';
import './App.css';

/*

Items:
- Try running as-is for initial smoke test
- Remove all the extra create-react-app boilerplate
- Design plan, component and method structure
- Which grid library to use?
- Build main component logic, connecting the API
- Styling, set up responsive layout


Notes:
- Going to stay in JS rather than do this in TS since the API handles only very basic types
- Normally would use TypeScript if the API handled more complex data shapes and sets of properties
- Going to use Sass for a CSS pre-processor -- unify input labels/fields, buttons, grid labels/rows


Notes from instructions:

Name input should be validated using the provided mock API to check whether the chosen name is taken or not.
-- standard red font subtext below Name field

Name input should be validated as the user is typing.
-- every time the field changes, make a new API call
-- for brevity, let this occur, say, once per second
---- apis.js already has a 2-second delay built-in... may or may not need to replicate client-side

Location dropdown options should be fetched using the provided mock API.
-- Name and Location fields, same width
-- Location dropdown is half-width

Component should have a responsive layout
-- Clear button functionality is not specified
-- Assuming for now, based on its proximity to the Add button, that it should clear the grid

Component should be appropriately styled
-- Lower display of Name/Location in a 2:3 ratio

*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
