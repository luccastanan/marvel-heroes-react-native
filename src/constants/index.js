import {PUBLIC_KEY, PRIVATE_KEY} from 'react-native-dotenv';

import {prepareAction} from '../utils';
import md5 from 'md5';

const HOST = 'http://gateway.marvel.com';
const TS = 1;
const HASH = md5(TS + PRIVATE_KEY + PUBLIC_KEY);
const API_URL = `${HOST}/v1/public/characters?apikey=${PUBLIC_KEY}&ts=${TS}&hash=${HASH}&limit=100`;

const FETCH_HEROES = {
    URL: API_URL,
    ...prepareAction('FETCH_HEROES'),
};

const FILTER_HEROES = {
    ACTION: 'FILTER_HEROES',
};

export {FETCH_HEROES, FILTER_HEROES};
