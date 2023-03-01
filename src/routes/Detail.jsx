import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Review from "../components/Review";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbQuery,
  dbOnSnapshot,
  dbOrderBy,
} from "../FireBase";

export default function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detailMove, setDetailMove] = useState([]);
  const [review, setReview] = useState("");
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&region=KR`
      )
    ).json();
    setDetailMove(json);
    setLoading(false);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setReview(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const reviewObj = {
      userName: userInfo.name,
      movieName: detailMove.title,
      text: review,
      createdAt: Date.now(),
      creatorId: userInfo.uid,
    };
    await dbAddDoc(dbCollection(dbService, "review"), reviewObj);
    setReview("");
  };

  const [reviewContents, setReviewContents] = useState([]);
  useEffect(() => {
    getMovies();
    const chatQuery = dbQuery(
      dbCollection(dbService, "review"),
      dbOrderBy("createdAt", "asc")
    );
    dbOnSnapshot(chatQuery, (snapshot) => {
      const chatArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setReviewContents(chatArr);
    });
  }, []);

  return (
    <>
      {loading ? (
        <h1>로딩 중...</h1>
      ) : (
        <>
          <Link to="/">메인으로</Link>
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
          <div>
            {reviewContents.map((item) => (
              <Review
                key={item.id}
                reviewObj={item}
                userInfo={userInfo}
                // isOwner={item.creatorId === userInfo.uid}
                movieTitle={detailMove.title}
              />
            ))}
          </div>
          {userInfo !== null ? (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={review}
                onChange={onChange}
                maxLength={120}
                required
              />
              <input type="submit" value="입력" />
            </form>
          ) : null}
        </>
      )}
    </>
  );
}
