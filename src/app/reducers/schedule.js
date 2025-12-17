import {
    GET_SCHEDULE,
    SET_SCHEDULE
} from "../actions/schedule"

const initialState = {
    fetching: false,
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
        default:
            return state
    }
}