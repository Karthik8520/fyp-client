import rootReducer from "./RootReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {createStore, applyMiddleware} from "redux"
import logger from "redux-logger"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['currentUser']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


export default () => {
    const store = createStore(persistedReducer, applyMiddleware(logger));
    const persistor = persistStore(store)
    return { store, persistor }
}
