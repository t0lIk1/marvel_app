import { useState } from "react";

import SingleComicPage from "./SingleComicPage";
import ErrorBoundery from "../errorBoundery/ErrorBoundery";
import ComicsList from "../comicsList/ComicsList";
import { Helmet } from "react-helmet";




const ComicsPage = () => {

    // const [selectedComics, setComics] = useState(null);

    // const onComicsSelected = (id) => {
    //     setComics(id);
    // };


    return (
        <>
            <Helmet>
                <meta name="description"
                    content="Page with comics" />
                <title>Comics Page</title>
            </Helmet>
            <ComicsList />
        </>
    )


}
export default ComicsPage