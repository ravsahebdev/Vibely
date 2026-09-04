/**
 * Authentication API Service
 * 
 * Clean API service layer to interface with the backend server.
 * Backend endpoint routes and request/response payloads are isolated here
 * so that team members can adapt endpoint paths or authentication tokens
 * without modifying the UI components.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch responses and extract meaningful error messages
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  let data = null;

  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMessage =
      (typeof data === 'object' && data !== null && (data.message || data.error || data.detail)) ||
      (typeof data === 'string' && data.length > 0 ? data : `Request failed with status ${response.status}`);
    
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Login User
 * @param {Object} credentials - { emailOrUsername, password }
 * @returns {Promise<any>} Server response data
 */
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return await handleResponse(response);
  } catch (error) {
    // If server is not reachable / network error
    if (!error.status && error.name === 'TypeError') {
      throw new Error('Unable to connect to the authentication server. Please check your network or server URL.');
    }
    throw error;
  }
}

/**
 * Register New User
 * @param {Object} userData - { fullName, username, email, password, confirmPassword, agreeToTerms }
 * @returns {Promise<any>} Server response data
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return await handleResponse(response);
  } catch (error) {
    // If server is not reachable / network error
    if (!error.status && error.name === 'TypeError') {
      throw new Error('Unable to connect to the authentication server. Please check your network or server URL.');
    }
    throw error;
  }
}

export default {
  loginUser,
  registerUser,
};
