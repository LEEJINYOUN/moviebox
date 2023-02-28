import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [detailMove, setDetailMove] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&region=KR`
      )
    ).json();
    setDetailMove(json);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h2>{detailMove.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w1280/` + detailMove.poster_path}
        alt="없음"
        width="150px"
        height="200px"
      />
      <p>{detailMove.overview}</p>
    </div>
  );
}
