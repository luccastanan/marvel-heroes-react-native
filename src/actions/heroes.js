import {FILTER_HEROES, FETCH_HEROES} from '../constants';
import heroDTO from '../dto/heroDTO';
import {getHeroes} from '../services/heroesServices';

const fetchingHeroes = () => ({
    type: FETCH_HEROES.ACTION,
});

const getSuccessFetchHeroes = data => ({
    type: FETCH_HEROES.SUCCESS,
    payload: {
        heroes: data.data.results.map(hero => heroDTO(hero)),
    },
});

const getFailedFetchHeroes = errorMessage => ({
    type: FETCH_HEROES.FAILED,
    payload: {errorMessage},
});

const fetchHeroes = () => dispatch => {
    dispatch(fetchingHeroes());
    getHeroes()
        .then(data => {
            dispatch(getSuccessFetchHeroes(data));
        }).catch(e => {
            dispatch(getFailedFetchHeroes(`Erro ao baixar heróis: ${e.message}`));
        });
};

const filteringHeroes = filter => ({
    type: FILTER_HEROES.ACTION,
    payload: {filter},
});

const filterHeroes = filter => dispatch => {
    dispatch(filteringHeroes(filter.trim().toLowerCase()));
};

export {filterHeroes, fetchHeroes};
