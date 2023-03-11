import "./css/MovieDetail.css";
import React from "react";

export default function MovieDetail({ detailMove }) {
  return (
    <div className="detailBox">
      <div className="detailBoxLeft">
        <img
          src={`https://image.tmdb.org/t/p/w1280/` + detailMove.poster_path}
          alt="영화포스터"
        />
      </div>
      <div className="detailBoxRight">
        <div className="detailTitle">{detailMove.title}</div>
        <div className="detailGenres">
          장르&nbsp;:&nbsp;
          {detailMove.genres.map((item, key) => (
            <span key={key}>{item.name}&nbsp;</span>
          ))}
        </div>
        <div className="detailRuntime">
          시간&nbsp;:&nbsp;{detailMove.runtime}분
        </div>
        <div className="detailReleaseDate">
          개봉&nbsp;:&nbsp;{detailMove.release_date}
        </div>
        <div className="detailOverview">{detailMove.overview}</div>
      </div>
    </div>
  );
}
