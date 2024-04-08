if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env' });
}

const config = {
  apiURL: process.env.REACT_APP_API_URL,
  environment: process.env.REACT_APP_ENV,
};

export default config;