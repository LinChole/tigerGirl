import {TOGGLE_MODAL_START,TOGGLE_MODAL,CLOSE_MODAL} from "../actions/modal"

const initialState={
    toggle:false
}

export function modal (state=initialState, action){
    switch (action.type) {
        case TOGGLE_MODAL_START:
        return {
            ...state,
            toggle:false
        }
        case  TOGGLE_MODAL:
        return {
            ...state,
            toggle:!state.toggle
        }
        case  CLOSE_MODAL:
            return {
                ...state,
                toggle:action.trueORfalse
            }
    
    
        default:
            return state;
    }
}