// SingleComic.js

import React from 'react'; // Добавим импорт React
import './singleComicPage.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleComicPage = () => {
    const [comicsData, setComicsData] = useState(null);
    const { loading, error, getComics, clearError } = useMarvelService();
    const { comicId } = useParams()
    console.log(comicId)
    useEffect(() => {
        updateComics();
    }, []);

    const onCharLoaded = (comics) => {
        setComicsData(comics);
    };

    const updateComics = () => {
        if (!comicId) {
            return;
        }
        clearError();
        console.log(getComics(comicId))
        getComics(comicId)
            .then(onCharLoaded);
    };



    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comicsData) ? <View comics={comicsData} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ comics }) => {
    const { title, pageCount, description, language, price, thumbnail } = comics;
    return (
        <div className="single-comic">
            <Helmet>
                <meta name="description"
                    content={`${title} comics book`}/>
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
        </div>
    );
};

export default SingleComicPage;
