const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors());

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjIzODY3LCJpYXQiOjE3NDI2MjM1NjcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjAzMGJjMzliLWZkYzYtNGM2OS1hYzQ4LWNjY2E1OTgwM2ZhYiIsInN1YiI6IjcxNzgyMmYyMzlAa2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0iLCJjbGllbnRJRCI6IjAzMGJjMzliLWZkYzYtNGM2OS1hYzQ4LWNjY2E1OTgwM2ZhYiIsImNsaWVudFNlY3JldCI6ImZpbXlRbGZybmZXR09YZE4iLCJvd25lck5hbWUiOiJQb292YXJhc2FuIiwib3duZXJFbWFpbCI6IjcxNzgyMmYyMzlAa2NlLmFjLmluIiwicm9sbE5vIjoiNzE3ODIyZjIzOSJ9.oGoE0EZcTTj8yWtTm439IZPS4LsuZrwuLp4mw6dzHTA";


const API_URL = "http://20.244.56.144/test/fibo";

app.get("/data", async (req, res) => {
    try {
        console.log("Sending request to API...");

       
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });

        // Log and send the response data
        console.log("API Response:", response.data);
        res.status(200).json({ data: response.data });

    } catch (err) {
        console.error("Error fetching data:", err.response?.status, err.response?.data || err.message);
        
        // Send appropriate error response
        res.status(err.response?.status || 500).json({
            error: "Failed to fetch data",
            message: err.response?.data || err.message
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
