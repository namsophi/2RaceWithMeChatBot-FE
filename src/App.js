import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const cities = ['Toronto', 'Vancouver', 'Boston', 'Tokyo', 'Delhi', 'Cairo', 'Mumbai', 'Brussels'];
const country = ['Canada', 'Canada', 'United States', 'Japan', 'India', 'Egypt', 'India', 'Belgium'];

function App() {
  const [travelled, setTravelled] = useState('');

  function yesClick(e) {
    fetch('http://127.0.0.1:5000/greeting?' + new URLSearchParams({
      certainty: 'certain',
      name: 'Sophie',
}))
  }

  function noClick(e) {
    fetch('http://127.0.0.1:5000/greeting?' + new URLSearchParams({
      certainty: 'uncertain',
      name: 'Sophie',
}))
  }

  function location_data(e) {
    console.log(e.key)
    const country_index = cities.indexOf(e);
    const country_name = country[country_index];
    fetch('http://127.0.0.1:5000/location?' + new URLSearchParams({
      city: e,
      country: country_name
}));
  }

  function weather(e) {
    fetch('http://127.0.0.1:5000/weather?' + new URLSearchParams({
        location: e
  }));
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(travelled.toString());
    setTravelled('');
    fetch('http://127.0.0.1:5000/distance?' + new URLSearchParams({
      travelled: travelled.toString()
  }));
    
    console.log("cleared");
  };

  return (
    <div className="App">
      <div>
        Are we certain about user's identity?
      </div>
      <ButtonGroup>
        <Button
          key='Yes'
          onClick={yesClick}
        >
        Yes
        </Button>
        <Button
          key='No'
          onClick={noClick}
        >
        No
        </Button>
      </ButtonGroup>
      <div>
        Which city would you like to travel to?
      </div>
      <ButtonGroup>
      {cities.map(city => (
        <Button
          key={city}
          onClick={() => location_data(city)}
        >
          {city}
        </Button>
      ))}
    </ButtonGroup>
    <div>
        Which city's weather should we look at?
      </div>
      <ButtonGroup>
      {cities.map(city => (
        <Button
          key={city}
          onClick={() => weather(city)}
        >
          {city}
        </Button>
      ))}
    </ButtonGroup>
    <div>
        How many kilometers have you travelled today? 
    </div>
    <br></br>
      <form id="form" onSubmit={handleSubmit}>
        <input id="travelled" type="text" onChange={event => setTravelled(event.target.value)}/>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;