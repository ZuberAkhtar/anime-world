const baseUrl = `https://api.jikan.moe/v3/`

const getSearchResult = (query) => fetch(`${baseUrl}search/anime?q=${query.searchValue}&limit=${query.limit}`);
const getTopResult = () => fetch(`${baseUrl}top/anime`);

export default {
    getSearchResult,getTopResult
}