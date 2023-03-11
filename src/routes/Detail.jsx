import "./css/Detail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import ReviewWrite from "../components/ReviewWrite";
import ReviewLists from "../components/ReviewLists";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbQuery,
  dbWhere,
  dbGetDocs,
} from "../FireBase";
import styled from "styled-components";

const StarCheckBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #c4c4c4;
    cursor: pointer;
  }
  :hover svg {
    color: #f7a000;
  }
  & svg:hover ~ svg {
    color: #c4c4c4;
  }
  .orange {
    color: #f7a000;
  }
`;

export default function Detail() {
  let reviewCount = 0;
  const [starClicked, setStarClicked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const starArray = [0, 1, 2, 3, 4];
  const startOnClick = (e) => {
    let starClick = [...starClicked];
    for (let i = 0; i < 5; i++) {
      starClick[i] = i <= e ? true : false;
    }
    setStarClicked(starClick);
  };
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detailMove, setDetailMove] = useState([]);
  const [review, setReview] = useState("");
  const [reviewContents, setReviewContents] = useState(0);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&region=KR`
      )
    ).json();
    setDetailMove(json);
    setLoading(false);
    let reviewContentsArray = [];
    const reviewRef = dbCollection(dbService, "review");
    const reviewQuery = dbQuery(
      reviewRef,
      dbWhere("movieName", "==", json.title),
      dbWhere("creatorId", "==", userInfo.uid)
    );
    const querySnapshot = await dbGetDocs(reviewQuery);
    querySnapshot.forEach((doc) => {
      reviewContentsArray.push(doc.data());
    });
    setReviewContents(reviewContentsArray.length);
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
    let score = starClicked.filter(Boolean).length;
    if (score === 0) {
      alert("평점을 등록해주세요.");
    } else {
      if (reviewCount !== 0 || reviewContents !== 0) {
        alert("이미 관람평을 작성하셨습니다.");
      } else {
        const reviewObj = {
          userName: userInfo.name,
          movieName: detailMove.title,
          text: review,
          movieGrade: score,
          createdAt: Date.now(),
          creatorId: userInfo.uid,
        };
        await dbAddDoc(dbCollection(dbService, "review"), reviewObj);
        reviewCount = 1;
        window.location.reload();
      }
    }
    setReview("");
    setStarClicked([false, false, false, false, false]);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {loading ? (
        <span className="loading">로딩 중...</span>
      ) : (
        <section className="detailSection">
          <div className="detailContainer">
            <MovieDetail detailMove={detailMove} />
            <div className="reviewBox">
              <ReviewWrite
                userInfo={userInfo}
                onSubmit={onSubmit}
                StarCheckBox={StarCheckBox}
                starArray={starArray}
                startOnClick={startOnClick}
                starClicked={starClicked}
                review={review}
                onChange={onChange}
              />
              <ReviewLists
                userInfo={userInfo}
                detailMove={detailMove}
                starArray={starArray}
                starClicked={starClicked}
                reviewCount={reviewCount}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
