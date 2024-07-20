import { Routes, Route, Link } from 'react-router-dom';

import 'preline/preline';

import FilmRollPage from './FilmRollPage';
import CameraFilmPage from './CameraFilmPage';
import CameraAdditionalPage from './CameraAdditionalPage';

const MarketplacePage = () => {
  return (
    <>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white text-sm py-3 md:py-0">
        <nav className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8" aria-label="Global">
          <div className="relative md:flex md:items-center md:justify-between">
            <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
              <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                <div className="flex flex-col divide-y divide-dashed divide-gray-200 md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7 md:divide-y-0 md:divide-solid">
                  <Link to="/marketplace/filmroll" className="font-medium text-gray-800 hover:text-red-600 py-3 md:px-3 md:py-6">Film Roll</Link>
                  <Link to="/marketplace/camerafilm" className="font-medium text-gray-800 hover:text-red-600 py-3 md:px-3 md:py-6">Camera Film</Link>
                  <Link to="/marketplace/cameraadditional" className="font-medium text-gray-800 hover:text-red-600 py-3 md:px-3 md:py-6">Camera Additional</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex">
        <Routes>
          <Route path="/" element={<FilmRollPage />} />
          <Route path="/filmroll" element={<FilmRollPage />} />
          <Route path="/camerafilm" element={<CameraFilmPage />} />
          <Route path="/cameraadditional" element={<CameraAdditionalPage />} />
        </Routes>
      </div>
    </>
  );
}

export default MarketplacePage;
