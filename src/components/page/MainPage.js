import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";

import ErrorBoundery from "../errorBoundery/ErrorBoundery";
import decoration from "../../resources/vision.067d4ae1936d64a577ce.png";
import { Helmet } from "react-helmet";




const MainPage = () => {

  const [selectedChar, setChar] = useState(null);


  const onCharSelected = (id) => {
    setChar(id);
  };


  return (
    <>
      <Helmet>
        <meta name="description"
          content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <ErrorBoundery>
          <CharInfo charId={selectedChar} />
        </ErrorBoundery>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />

    </>
  )
}

export default MainPage;