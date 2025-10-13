import {SET_PAGE_TYPE} from '../../const';
import {AnyAction} from 'redux';

export interface IPageTypeState {
    pageType: string;
}

const initialState = {
    pageType: 'FilmList',
};

export const setPageTypeAC = (pageType: string) => ({
    type: SET_PAGE_TYPE,
    pageType,
});

export const pageTypeReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_PAGE_TYPE: {
            return {
                ...state,
                pageType: action.pageType,
            };
        }

        default:
            return state;
    }
};
