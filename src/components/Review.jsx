import "./css/Review.css";
import React, { useState } from "react";
import { dbService, dbDoc, dbDeleteDoc, dbUpdateDoc } from "../FireBase";

export default function Review({ reviewObj, userInfo, movieTitle }) {
  const [editing, setEditing] = useState(false);
  const [newReview, setNewReview] = useState(reviewObj.text);
  const [newGrade, setNewGrade] = useState(reviewObj.movieGrade);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const reviewUpdate = dbDoc(dbService, "review", `${reviewObj.id}`);
    await dbUpdateDoc(reviewUpdate, { text: newReview, movieGrade: newGrade });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewReview(value);
  };

  const gradeOnChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewGrade(value);
  };

  return (
    <>
      {movieTitle === reviewObj.movieName ? (
        <section className="reviewListBox" key={reviewObj.id}>
          {editing ? (
            <div className="editContainer">
              <form onSubmit={onSubmit} className="editForm">
                <div className="editTop">
                  <span className="editGrade">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      defaultValue={newGrade}
                      onChange={gradeOnChange}
                    />
                    &nbsp;점
                  </span>
                  <input type="submit" value="수정" className="editSubmitBtn" />
                </div>
                <div className="editBottom">
                  <input
                    type="text"
                    value={newReview}
                    required
                    onChange={onChange}
                  />
                </div>
              </form>
              <div className="editCancelBox">
                <button className="editCancelBtn" onClick={toggleEditing}>
                  취소
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="reviewListTop">
                <span className="reviewUserName">{reviewObj.userName}</span>
                <span className="reviewCreatedAt">
                  {new Date(reviewObj.createdAt).toLocaleString().slice(0, 10)}
                </span>
              </div>
              <div className="reviewListMiddle">
                <span className="reviewMovieGrade">
                  {reviewObj.movieGrade}&nbsp;/&nbsp;5
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
            </>
          )}
        </section>
      ) : null}
    </>
  );
}
