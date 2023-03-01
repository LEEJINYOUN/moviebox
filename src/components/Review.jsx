import React, { useState } from "react";
import { dbService, dbDoc, dbDeleteDoc, dbUpdateDoc } from "../FireBase";

export default function Review({ reviewObj, userInfo, movieTitle }) {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const reviewUpdate = dbDoc(dbService, "review", `${reviewObj.id}`);
    await dbUpdateDoc(reviewUpdate, { text: newReview });
    setEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewReview(value);
  };

  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={newReview} required onChange={onChange} />
            <input type="submit" value="수정하기" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : null}
      {movieTitle === reviewObj.movieName ? (
        <div key={reviewObj.id}>
          <span>{reviewObj.userName}</span>
          <span>{new Date(reviewObj.createdAt).toLocaleString()}</span>
          <h4>{reviewObj.text}</h4>
          {userInfo !== null && reviewObj.creatorId === userInfo.uid ? (
            <>
              <button onClick={toggleEditing}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
