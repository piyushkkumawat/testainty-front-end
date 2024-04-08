import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.js';

const Store = configureStore({
    reducer: rootReducer,
})

export default Store;