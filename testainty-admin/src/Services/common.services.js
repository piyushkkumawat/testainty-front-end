import axios from 'axios';
import { toast } from 'react-hot-toast'

export const commonService = {
    withOutToken,
    getwithOutToken,
    withToken,
    withTokenPatch,
    getDataWithToken,
    getWithToken,
    withTokenFormData
};

//-- It's common function for using without token
async function withOutToken(apiName, data, timeout = 30000) {
    // Create a new AbortController
    const controller = new AbortController();
    const { signal } = controller;

    // Set up a timeout to abort the request after a specified time (e.g., 30 seconds)
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout); // 30 seconds

    // Define request configuration
    const config = {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL + apiName}`,
        data: data,
        signal, // Assign the signal to the request
    };

    // Send the request
    try {
        const response = await axios(config);
        const responseData = handleResponse(response);
        return responseData;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log(`Request to ${apiName} aborted after ${timeout} milliseconds.`);
        } else {
            console.error(`Error in request to ${apiName}:`, error);
            throw error; // Throw the error to allow the calling code to handle it
        }
    } finally {
        clearTimeout(timeoutId);
    }
}

//-- It's common function for using the token
async function withToken(apiName, data) {
    try {
        // Initialize the i18n translation hook.
        let userData = JSON.parse(localStorage.getItem('userData'));
        let token = userData?.token;

        // Create a new AbortController instance
        const controller = new AbortController();
        const signal = controller.signal;

        const config = {
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL + apiName}`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            data: data,
            signal: signal
        }
        // Create a promise that resolves when the request is completed
        const response = await axios(config);
        const responseData = handleResponse(response);
        return responseData;
    } catch (error) {
        handleError(error);
        return Promise.reject(error); // Propagate the error
    }
}

//-- It's common function for using the token
async function withTokenPatch(apiName, data) {
    try {
        // Initialize the i18n translation hook.
        let userData = JSON.parse(localStorage.getItem('userData'));
        let token = userData?.token;

        // Create a new AbortController instance
        const controller = new AbortController();
        const signal = controller.signal;

        const config = {
            method: 'PATCH',
            url: `${process.env.REACT_APP_API_URL + apiName}`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            data: data,
            signal: signal
        }
        // Create a promise that resolves when the request is completed
        const response = await axios(config);
        const responseData = handleResponse(response);
        return responseData;
    } catch (error) {
        handleError(error);
        return Promise.reject(error); // Propagate the error
    }
}

//-- It's common function for using without token for get data
async function getwithOutToken(apiName) {
    try {
        const config = {
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL + apiName}`
        }
        const response = await axios(config);
        const responseData = handleResponse(response);
        return responseData;
    } catch (error) {
        handleError(error);
        throw error; // Propagate the error
    }
}

//-- get data
async function getDataWithToken(apiName, data) {
    try {
        let userData = JSON.parse(localStorage.getItem('userData'));
        let token = userData.token;
        const config = {
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL + apiName}`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            data: data
        }
        const response = await axios(config);

        const responseData = handleResponse(response);
        return responseData;
    } catch (error) {
        handleError(error);
        throw error; // Propagate the error
    }
}

async function getWithToken(apiName) {
    try {
        let userData = JSON.parse(localStorage.getItem('userData'));
        let token = userData.token;
        const config = {
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL + apiName}`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        }
        const response = await axios(config);
        const responseData = handleResponse(response);
        return responseData;
    } catch (error) {
        handleError(error);
        throw error; // Propagate the error
    }
}


//-- It's common function for using the token and multipart form data
async function withTokenFormData(apiName, data) {
    try {
        let userData = JSON.parse(localStorage.getItem('userData'));
        let token = userData.token;

        // Create a new AbortController instance
        const controller = new AbortController();
        const signal = controller.signal;
        const config = {
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL + apiName}`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: data,
            signal: signal, // Associate the signal with the request
        }
        // Create a promise that resolves when the request is completed
        const response = await axios(config);

        const responseData = handleResponse(response);
        return responseData;
    } catch (error) {
        handleError(error);
        throw error; // Propagate the error
    }
}


function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
        return response;
    } else {
        const error = response;
        return Promise.reject(error);
    }
}

function handleError(error) {
    if (error && error.response) {
        if (error.response.status === 400) {
            toast.error(error.response.data.message);
        }
        if (error.response.status === 500 && error.response.data && !error.response.data.status) {
            console.log(error.response, error.response);
            toast.error('Something went wrong!');
        }
    } else {
        console.error('Error in function:', error);
    }

    return Promise.reject(error); // Propagate the error
}

