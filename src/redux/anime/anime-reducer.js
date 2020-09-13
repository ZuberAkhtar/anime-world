const INITIAL_STATE = {
    animeList : []
}

const animeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_ANIME_LIST':
            return {
                ...state,
                animeList:action.payload
            }
        case 'APPEND_ANIME_LIST':
            return {
                ...state,
                animeList:action.payload
            }
        default:
            return state;
    }
}

export default animeReducer;