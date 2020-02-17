import { combineReducers } from 'redux';
import componentvis from './componentvis';
const allReducers = combineReducers({
    content: componentvis,
})
export default allReducers;