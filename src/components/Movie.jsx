import React from "react";
import { Link } from "react-router-dom";
import "./css/Movie.css";

export default function Movie({ movies }) {
  return (
    <>
      {movies.map((item, key) => {
        return (
          <div className="movieCard" key={key}>
            <div className="movieImgBox">
              <img
                src={`https://image.tmdb.org/t/p/w1280/` + item.poster_path}
                alt={item.title}
                className="movieImg"
              />
            </div>
            <div className="movieText">
              <Link to={`/movie/${item.id}`} className="cardDetail">
                {item.title.length > 10
                  ? `${item.title.slice(0, 10)}...`
                  : item.title}
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
