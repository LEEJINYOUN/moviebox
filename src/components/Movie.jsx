import React from "react";
import { Link } from "react-router-dom";

export default function Movie({ movies }) {
  return (
    <div>
      {movies.map((item, key) => (
        <div key={key}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/` + item.poster_path}
            alt="없음"
            width="150px"
            height="200px"
          />
          <h2>
            <Link to={`/movie/${item.id}`}>{item.title}</Link>
          </h2>
          <p>{item.overview}</p>
        </div>
      ))}
    </div>
  );
}
