import AppHeader from "../appHeader/AppHeader";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../page/MainPage'))
const Page404 = lazy(() => import('../page/404'))
const SingleComicPage = lazy(() => import('../page/SingleComicPage'))
const ComicsPage = lazy(() => import('../page/ComicsPage'))


const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="*" element={<Page404 />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />

            </Routes>
          </main>
        </div>
      </Suspense >
    </Router>
  );
};

export default App;
