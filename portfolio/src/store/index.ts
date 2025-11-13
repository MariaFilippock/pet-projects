import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import {
    dropdownMovieListReducer
} from './reducers/dropdownMovieList-reducer';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {movieCardReducer} from './reducers/movieCard-reducer';
import {movieListReducer} from './reducers/movieList-reducer';
import {IDropdownMovieListState, IMovieListState, IMovieState, IStartMoviesListState} from 'pages/FilmopoiskReact/Models';
import {startMovieListReducer} from 'store/reducers/startMovieList-reducer';

export interface IAppState {
    dropdownMovieList: IDropdownMovieListState;
    movie: IMovieState;
    movieList: IMovieListState;
    startMoviesList: IStartMoviesListState;
}

let reducers = combineReducers({
    dropdownMovieList: dropdownMovieListReducer,
    movie: movieCardReducer,
    movieList: movieListReducer,
    startMoviesList: startMovieListReducer,
});

export type AppDispatch = ThunkDispatch<IAppState, unknown, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

const initState = () => {
    try {
        const lsState = localStorage.getItem('filmopoisk');
        if (lsState === null) {
            return undefined;
        }
        return JSON.parse(lsState);
    } catch (err) {
        console.error('Ошибка загрузки состояния из localStorage', err);
        return undefined;
    }
};

const persistedState = initState();

export const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(thunk)
);

//Подписываемся на изменения и сохраняем state в Local Storage
store.subscribe(() => {
    try {
        const savedState = JSON.stringify(store.getState());
        localStorage.setItem('filmopoisk', savedState);
    } catch (err) {
        console.error('Ошибка сохранения состояние в localStorage', err);
    }
});
