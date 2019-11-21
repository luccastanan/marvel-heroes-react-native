import {FILTER_HEROES, FETCH_HEROES} from '../constants';

const initialState = {
    characters: [],
    filteredCharacters: [],
    isFetching: false,
    isFiltering: false,
    errorMessage: '',
};

export default function heroes(state = initialState, action) {
    switch (action.type) {
        case FILTER_HEROES.ACTION:
            return {
                ...state,
                isFiltering: action.payload.filter.length != 0,
                filteredCharacters: action.payload.filter.length == 0 ? [] : state.characters.filter(char => char.name.toLowerCase().includes(action.payload.filter)),
            };
        case FETCH_HEROES.ACTION:
            return {
                ...state,
                isFetching: true,
            };
        case FETCH_HEROES.SUCCESS:
            return {
                ...state,
                characters: action.payload.heroes,
                isFetching: false,
                isFiltering: false,
            };
        case FETCH_HEROES.FAILED:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
                isFetching: false,
                isFiltering: false,
            };
        default:
            return {
                ...state,
            };
    }
}
