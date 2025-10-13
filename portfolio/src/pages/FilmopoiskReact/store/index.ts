import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import {
    dropdownMovieListReducer,
    IDropdownMovieListState,
} from './reducers/dropdownMovieList-reducer';
import {thunk, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {
    IMovieState,
    movieCardReducer,
} from './reducers/movieCard-reducer';
import {
    IMovieListState,
    movieListReducer,
} from './reducers/movieList-reducer';
import {
    IPageTypeState,
    pageTypeReducer,
} from './reducers/pageType-reducer';

export interface IAppState {
    dropdownMovieList: IDropdownMovieListState;
    movie: IMovieState;
    movieList: IMovieListState;
    pageType: IPageTypeState;
}

let reducers = combineReducers({
    dropdownMovieList: dropdownMovieListReducer,
    movie: movieCardReducer,
    movieList: movieListReducer,
    pageType: pageTypeReducer,
});

export type AppDispatch = ThunkDispatch<IAppState, unknown, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;

const loadState = () => {
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

const persistedState = loadState();

export let index = createStore(
    reducers,
    persistedState,
    applyMiddleware(thunk)
);

//Подписываемся на изменения и сохраняем state в Local Storage
index.subscribe(() => {
    try {
        const savedState = JSON.stringify(index.getState());
        localStorage.setItem('filmopoisk', savedState);
    } catch (err) {
        console.error('Ошибка сохранения состояние в localStorage', err);
    }
});
