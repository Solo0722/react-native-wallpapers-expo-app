import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = async ({ children }) => {
  const [downloadedPhotos, setDownloadedPhotos] = useState([]);
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        downloadedPhotos,
        favoritePhotos,
        setDownloadedPhotos,
        setFavoritePhotos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
