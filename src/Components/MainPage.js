import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios'; 

const MainPage = () => {
    const [data, setData] = useState([]); 

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const first = performance.now();
                const response = await axios.get("http://localhost:9000/posts");
                const end = performance.now();
                console.log("Fetch time:", end - first, "ms");

             
                const result = response.data.data; 
                setData(result);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchApi();
    }, []);

    return (
        <Fragment>
            <h2>Fetched Data:</h2>
            {data.length === 0 ? ( // ✅ Show message if no data
                <p>Loading data...</p>
            ) : (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li> // ✅ Properly display data
                    ))}
                </ul>
            )}
        </Fragment>
    );
};

export default MainPage;
