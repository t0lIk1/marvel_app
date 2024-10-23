import "./comicsList.scss";
import uw from "../resources/img/UW.png";
import xMen from "../resources/img/x-men.png";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from "react-router-dom";

const ComicsList = () => {
    const [comicsData, setComicsData] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(100);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getComicsList } = useMarvelService();

    useEffect(() => {
        updateComics(offset, true);
    }, [])

    const updateComics = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComicsList(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsData) => {
        let ended = false;
        if (newComicsData.length < 8) {
            ended = true;
        }
        setComicsData(comicsData => [...comicsData, ...newComicsData]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setComicsEnded(comicsEnded => ended);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">
                            {item.title}
                        </div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    const items = renderItems(comicsData);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': comicsEnded || newItemLoading ? 'none' : 'block' }}
                onClick={() => updateComics(offset)}>
                load more
            </button>
        </div>
    );
};

export default ComicsList;
