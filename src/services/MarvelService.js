import md5 from "md5"; // Убедитесь, что у вас установлена библиотека md5
import { useHtpp } from "../components/hooks/htpp.hooks";
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHtpp();
    const privateKey = "0b8369ca65f6d7fa3f110c53a46e7e2399cd5b61";
    const _apiKey = "a20a6b6c96d3b9c7f50d2483e42b9038";

    const _apiBase = "https://gateway.marvel.com:443/v1/public/characters";
    const _baseOffset = 210;

    const generateHash = (timestamp) => {
        return md5(timestamp + privateKey + _apiKey);
    };

    const getAllCharacters = async (offset = _baseOffset) => {
        // Принимаем функцию обратного вызова
        const timestamp = new Date().getTime().toString();
        const hash = generateHash(timestamp);
        const apiUrl = `${_apiBase}?offset=${offset}&limit=9&apikey=${_apiKey}&ts=${timestamp}&hash=${hash}`;

        const res = await request(apiUrl);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const timestamp = new Date().getTime().toString();
        const hash = generateHash(timestamp);
        const apiUrl = `${_apiBase}/${id}?apikey=${_apiKey}&ts=${timestamp}&hash=${hash}`;
        const res = await request(apiUrl);
        return _transformCharacter(res.data.results[0]);
    };

    const getComicsList = async (offset = _baseOffset) => {
        const timestamp = new Date().getTime().toString();
        const hash = generateHash(timestamp);
        const apiUrl = `https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=${_apiKey}&ts=${timestamp}&hash=${hash}`;
        const res = await request(apiUrl);
        return res.data.results.map(_transformComics); // Corrected from res.data.result to res.data.results
    };

    const getComics = async (id) => {
        const timestamp = new Date().getTime().toString();
        const hash = generateHash(timestamp);
        const apiUrl = `https://gateway.marvel.com:443/v1/public/comics/${id}?limit=8&apikey=${_apiKey}&ts=${timestamp}&hash=${hash}`;
        console.log(apiUrl)
        

        const res = await request(apiUrl, undefined, undefined);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };
    const _transformComics = (comics) => {
        let description = '';
        if (comics.textObjects && comics.textObjects.length > 0 && comics.textObjects[0].text) {
            description = comics.textObjects[0].text;
        }

        return {
            id: comics.id,
            title: comics.title,
            pageCount: comics.pageCount,
            description: comics.description,
            language: "en",
            price: comics.prices && comics.prices.length > 0 ? comics.prices[0].price : '',
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension
        };
    };


    return { loading, clearError, error, getAllCharacters, getCharacter, getComics, getComicsList };
};

export default useMarvelService;
