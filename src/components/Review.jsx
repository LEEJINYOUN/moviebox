import "./css/Review.css";
import React, { useState } from "react";
import { dbService, dbDoc, dbDeleteDoc } from "../FireBase";
import ReviewModify from "./ReviewModify";
import { ImStarFull } from "react-icons/im";

export default function Review({ reviewObj, userInfo, movieTitle }) {
  const stars = Array(reviewObj.movieGrade).fill(true);
  const [editing, setEditing] = useState(false);
  const [newReview, setNewReview] = useState(reviewObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    const reviewDelete = dbDoc(dbService, "review", `${reviewObj.id}`);
    if (ok) {
      await dbDeleteDoc(reviewDelete);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  return (
    <>
      {movieTitle === reviewObj.movieName ? (
        <section className="reviewListBox" key={reviewObj.id}>
          <div className="reviewListTop">
            <span className="reviewUserName">{reviewObj.userName}</span>
            <span className="reviewCreatedAt">
              {new Date(reviewObj.createdAt).toLocaleString().slice(0, 10)}
            </span>
          </div>
          <div className="reviewListMiddle">
            <span className="reviewMovieGrade">
              {stars.map((item, key) => (
                <ImStarFull key={key} className="movieGrade" size="15" />
              ))}
            </span>
            {userInfo !== null && reviewObj.creatorId === userInfo.uid ? (
              <span className="reviewButtons">
                <button className="editBtn" onClick={toggleEditing}>
                  수정
                </button>
                <button className="deleteBtn" onClick={onDeleteClick}>
                  삭제
                </button>
              </span>
            ) : null}
          </div>
          <div className="reviewListBottom">
            <span className="reviewText">{reviewObj.text}</span>
          </div>
          {editing ? (
            <ReviewModify
              toggleEditing={toggleEditing}
              reviewObj={reviewObj}
              newReview={newReview}
              setNewReview={setNewReview}
              setEditing={setEditing}
            />
          ) : null}
        </section>
      ) : null}
    </>
  );
}
