import {
    GET_SCHEDULE,
    SET_SCHEDULE,
    CANCEL_SCHEDULE,
    SUCCESS_CANCEL_SCHEDULE,
    FINSH_CANCEL_SCHEDULE
} from "../actions/schedule"

const initialState = {
    fetching: false,
    pfetching: false,
    items: [],
    error: ''
}

export function schedule(state = initialState, action) {
    switch (action.type) {
        case GET_SCHEDULE:
            return {
                ...state,
                fetching: true,
                error: ''
            }
        case SET_SCHEDULE:
            return {
                ...state,
                fetching: false,
                items: action.items.map(d => ({
                    ...d,
                    status_fm: d.status === 0 ? '未完成' : d.status === 1 ? '已完成' : '已取消'
                })),
                error: action.error
            }
        case CANCEL_SCHEDULE:
            return {
                ...state,
                pfetching: true,
            }
        case SUCCESS_CANCEL_SCHEDULE:
            return {
                ...state,
                pfetching: false,
                items: state.items.filter(f => f.oid !== action.oid)
            }
        case FINSH_CANCEL_SCHEDULE:
            return {
                ...state,
                pfetching: false,
                error: action.msg
            }
        default:
            return state
    }
}