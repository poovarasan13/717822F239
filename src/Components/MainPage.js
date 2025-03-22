import React, { Fragment, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios'; 
const MainPage = () => {
  const [data, setData] = useState(null); 
  const [error, setError] = useState(null); 
  const [type, setType] = useState('fibo');
  const [details, setDetails] = useState({
    windowPrevState: [], 
    windowCurrState: [], 
    numbers: [], 
    avg: 0, 
  });
  const apiFetch = async (selectedType) => {
    try {
      const url = `http://localhost:9001/data/${selectedType}`; 
      const response = await axios.get(url); 
      const result = response.data.data; 

      setData(result); 
      console.log(result);

      const newNumbers = result.numbers.filter((n) => !details.windowCurrState.includes(n));

      let updatedWindow = [...details.windowCurrState, ...newNumbers];

      if (updatedWindow.length > 10) {
        const overflow = updatedWindow.length - 10; 
        updatedWindow = updatedWindow.slice(overflow);
      }

   
      setDetails({
        windowPrevState: details.windowCurrState, 
        windowCurrState: updatedWindow, 
        numbers: result.numbers, 
        avg: updatedWindow.reduce((a, b) => a + b, 0) 
      });

      setError(null); 
    } catch (err) {
      setError(err.message); 
      console.error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    apiFetch(type); 
  };

  return (
    <Fragment>
         <Container>
        <h1>Average Calculator Microservice</h1>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="numberType">Select Number Type</Label>
            <Input
              type="select"
              name="numberType"
              id="numberType"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="primes">Prime Numbers</option>
              <option value="fibo">Fibonacci Numbers</option>
              <option value="even">Even Numbers</option>
              <option value="rand">Random Numbers</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Form>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

     
        {data && (
          <div style={{ marginTop: '20px' }}>
            <h2>API Response</h2>
            <pre>{JSON.stringify(data)}</pre>

            <h2>Details</h2>
            <pre>{JSON.stringify(details)}</pre>
          </div>
        )}
      </Container>
    </Fragment>
  )
}

export default MainPage
