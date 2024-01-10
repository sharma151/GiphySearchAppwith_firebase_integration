import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../../lib/firebase';
import { searchGifs } from '../../lib/giphy';
// import "";
export default function Home() {
  const [user] = useAuthState(auth);
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const results = await searchGifs(query);
      setGifs(results);
      setPage(1);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, [query]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const toggleFavorite = (gif) => {
    const isFavorite = favorites.some((fav) => fav.id === gif.id);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== gif.id);
      setFavorites(updatedFavorites);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, gif];
      setFavorites(updatedFavorites);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>  <b> Giphy Search Application </b></h1>
      </header>
      <main>
        {!user ? (
          <div className="auth-buttons">
            <Link href="/signin">
              <button className="auth-button">Sign In</button>
            </Link>
            <Link href="/signup">
              <button className="auth-button">Sign Up</button>
            </Link>
            <button onClick={handleSignInWithGoogle} className="auth-button google">
              Sign In with Google
            </button>
          </div>
        ) : (
          <div>
            <p className="welcome-message">Welcome, {user.displayName}!</p>
            <button onClick={() => auth.signOut()} className="auth-button">
              Sign Out
            </button>
            <div className="search-container">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search term"
                className="search-input"
              />
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <button onClick={handleSearch} className="search-button">
                  Search GIFs
                </button>
              )}
            </div>
            <div className="gifs-container">
              <div className="gifs-inner-container">
                {gifs.slice((page - 1) * 5, page * 5).map((gif, index) => (
                  <div key={gif.id} className="gif-item">
                    <img src={gif.images.fixed_height.url} alt="GIF" className="gif-image" />
                    <div className="gif-index">{index + 1}</div>
                    <button onClick={() => toggleFavorite(gif)} className="favorite-button">
                      {favorites.some((fav) => fav.id === gif.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {gifs.length > 5 && (
              <div className="pagination-buttons">
                {[...Array(Math.ceil(gifs.length / 5)).keys()].map((pageNum) => (
                  <button
                    key={pageNum + 1}
                    onClick={() => handlePageChange(pageNum + 1)}
                    className={pageNum + 1 === page ? 'active' : ''}
                  >
                    {pageNum + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <style jsx>{`
        .container {
        
          height:500px;
          width:800px;
          position:absolute;
          left:18%;
          margin: 100px;
          padding: 10px;
          
          border-radius:25px;
          background-color:#E5E4E2;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);


        }

        header {
          text-align: center;
        }

        h1 {
          color: #333;
        }

        .auth-buttons {
          display: flex;
          flex-direction: column;
          margin:110px;
          align-items: center;
        }

        .auth-button {
          padding: 10px 30px;
          margin: 10px 0;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          background-color: #3498db;
          color: #fff;
          transition: background-color 0.3s;
        }

        .auth-button:hover {
          background-color: #2980b9;
        }

        .auth-button.google {
          background-color: #dd4b39;
        }

        .welcome-message {
          text-align: center;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .search-container {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .search-input {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .search-button {
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background-color: #3498db;
          color: #fff;
          transition: background-color 0.3s;
        }

        .search-button:hover {
          background-color: #2980b9;
        }

        .gifs-container {
          overflow: hidden;
        }

        .gifs-inner-container {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
        }

        .gif-item {
          flex: 0 0 auto;
          width: 150px;
          margin-right: 1rem;
          position: relative;
        }

        .gif-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .gif-index {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 5px;
          border-radius: 5px;
          font-size: 12px;
        }

        .pagination-buttons {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .pagination-buttons button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          margin: 0 5px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 5px;
          outline: none;
          transition: background-color 0.3s;
        }

        .pagination-buttons button.active {
          background-color: #2980b9;
        }

        .pagination-buttons button:hover {
          background-color: #2980b9;
        }

        .loading-spinner {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
