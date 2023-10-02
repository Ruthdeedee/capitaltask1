import yaml from 'js-yaml';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_GET_URL = 'http://127.0.0.1:4010/api/81.4788950437433/programs/qui/application-form';
const API_PUT_URL = 'http://127.0.0.1:4010/api/106.35664607844873/programs/qui/application-form';

interface ApiData {
  data: {
    id: string;
    type: string;
    attributes: {
    };
  }
}


export function useApiSchema() {
  const [apiSchema, setApiSchema] = useState<any | null>(null);

  useEffect(() => {
    const fetchApiSchema = async () => {
      try {
        
        // Fetch API schema from local file (Assume this is an API call from link)
        const response = await fetch(API_GET_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const yamlData = await response.text();
        const parsedSchema = yaml.load(yamlData);
        setApiSchema(parsedSchema);
      } catch (error) {
        console.error('Error fetching and parsing API schema:', error);
      }
    };

    fetchApiSchema();
  }, []);

  return apiSchema;

};

// Implement the updateApiSchema function
export const updateApiSchema = async (data : ApiData) => {
    try {
        // Make a PUT request to update the API with the new data
        const response = await axios.put(API_PUT_URL, data);

        // Check if the request was successful (status code 200)
        if (response.status === 204) {
            console.log('API schema updated successfully');
        } else {
            console.error('Failed to update API schema');
        }
    } catch (error) {
        console.error('Error updating API schema:', error);
    }
};