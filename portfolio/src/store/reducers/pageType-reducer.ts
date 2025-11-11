import {SET_PAGE_TYPE} from 'pages/FilmopoiskReact/const';
import {AnyAction} from 'redux';
import {EPageType} from 'pages/FilmopoiskReact/Models';

export interface IPageTypeState {
    pageType: string;
}

const initialState = {
    pageType: EPageType.StartList,
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
