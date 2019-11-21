import {FETCH_HEROES} from '../constants';
import {handleRes} from '../utils';

const getHeroes = () => fetch(FETCH_HEROES.URL).then(handleRes);

export {getHeroes};
