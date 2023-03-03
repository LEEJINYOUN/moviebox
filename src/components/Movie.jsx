import React from "react";
import { Link } from "react-router-dom";
import "./css/Movie.css";

export default function Movie({ movies }) {
  return (
    <section className="movieCardContainer">
      {movies.map((item, key) => {
        return (
          <div className="card" key={key}>
            <div className="cardTop">
              <img
                src={`https://image.tmdb.org/t/p/w1280/` + item.poster_path}
                alt="영화포스터"
              />
            </div>
            <div className="cardBottom">
              <Link to={`/movie/${item.id}`} className="cardDetail">
                {item.title}
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
}
