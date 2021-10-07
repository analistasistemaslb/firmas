import { configureStore } from '@reduxjs/toolkit';
import casos from './casosSlice';

const store = configureStore({
    reducer: {
        casos,
    },
    devTools: true,
});

export default store;