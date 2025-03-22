const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 9000;

app.use(cors());

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI1ODc2LCJpYXQiOjE3NDI2MjU1NzYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjAzMGJjMzliLWZkYzYtNGM2OS1hYzQ4LWNjY2E1OTgwM2ZhYiIsInN1YiI6IjcxNzgyMmYyMzlAa2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0iLCJjbGllbnRJRCI6IjAzMGJjMzliLWZkYzYtNGM2OS1hYzQ4LWNjY2E1OTgwM2ZhYiIsImNsaWVudFNlY3JldCI6ImZpbXlRbGZybmZXR09YZE4iLCJvd25lck5hbWUiOiJQb292YXJhc2FuIiwib3duZXJFbWFpbCI6IjcxNzgyMmYyMzlAa2NlLmFjLmluIiwicm9sbE5vIjoiNzE3ODIyZjIzOSJ9.UDNFAx_e1MU4GarG-YlmMKvFOh1l4c5DjnDN7vrpYvM";



app.get("/posts", async (req, res) => {
  
    try {
        console.log("Sending request to API...");

       
        const response = await axios.get(`http://20.244.56.144/test/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });

        console.log(response.data);
        console.log("API Response:", response.data);
        res.status(200).json({ data: response.data });

    } catch (err) {
        console.error("Error fetching data:", err.response?.status, err.response?.data || err.message);
        
       
        res.status(err.response?.status || 500).json({
            error: "Failed to fetch data",
            message: err.response?.data || err.message
        });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
