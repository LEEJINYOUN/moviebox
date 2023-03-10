import "./css/Detail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review";
import {
  dbService,
  dbAddDoc,
  dbCollection,
  dbQuery,
  dbOnSnapshot,
  dbOrderBy,
} from "../FireBase";
import { ImStarFull } from "react-icons/im";
import styled from "styled-components";

const RatingBox = styled.div`
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
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
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
    let score = clicked.filter(Boolean).length;
    const reviewObj = {
      userName: userInfo.name,
      movieName: detailMove.title,
      text: review,
      movieGrade: score,
      createdAt: Date.now(),
      creatorId: userInfo.uid,
    };
    await dbAddDoc(dbCollection(dbService, "review"), reviewObj);
    setReview("");
    setClicked("");
  };

  const [reviewContents, setReviewContents] = useState([]);
  useEffect(() => {
    getMovies();
    const chatQuery = dbQuery(
      dbCollection(dbService, "review"),
      dbOrderBy("createdAt", "desc")
    );
    dbOnSnapshot(chatQuery, (snapshot) => {
      const chatArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setReviewContents(chatArr);
    });
  });

  return (
    <>
      {loading ? (
        <span className="loading">로딩 중...</span>
      ) : (
        <section className="detailSection">
          <div className="detailContainer">
            <div className="detailBox">
              <div className="detailBoxLeft">
                <img
                  src={
                    `https://image.tmdb.org/t/p/w1280/` + detailMove.poster_path
                  }
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
            <div className="reviewBox">
              <div className="reviewWrite">
                {userInfo !== null ? (
                  <form onSubmit={onSubmit} className="reviewForm">
                    <div className="reviewTop">
                      <span>평점 및 관람평 작성</span>
                    </div>
                    <div className="reviewMiddle">
                      <RatingBox>
                        {array.map((el) => (
                          <ImStarFull
                            key={el}
                            onClick={() => handleStarClick(el)}
                            className={clicked[el] && "orange"}
                            size="35"
                          />
                        ))}
                      </RatingBox>
                    </div>
                    <div className="reviewBottom">
                      <input
                        type="text"
                        value={review}
                        onChange={onChange}
                        placeholder="평점 및 영화 관람평을 작성해주세요."
                        required
                      />
                      <input type="submit" value="작성" />
                    </div>
                  </form>
                ) : (
                  <div className="reviewNone">
                    관람평은 로그인 후 작성 가능합니다.
                  </div>
                )}
              </div>
              <div className="reviewLists">
                {reviewContents.map((item) => (
                  <Review
                    key={item.id}
                    reviewObj={item}
                    userInfo={userInfo}
                    movieTitle={detailMove.title}
                    array={array}
                    clicked={clicked}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
