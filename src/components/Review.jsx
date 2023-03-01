import React from "react";
import { dbService, dbDoc, dbDeleteDoc } from "../FireBase";

export default function Review({ reviewObj, userInfo, movieTitle }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    const chatDelete = dbDoc(dbService, "review", `${reviewObj.id}`);
    if (ok) {
      await dbDeleteDoc(chatDelete);
    }
  };
  return (
    <>
      {movieTitle === reviewObj.movieName ? (
        <div key={reviewObj.id}>
          <span>{reviewObj.userName}</span>
          <span>{new Date(reviewObj.createdAt).toLocaleString()}</span>
          <h4>{reviewObj.text}</h4>
          {userInfo !== null && reviewObj.creatorId === userInfo.uid ? (
            <button onClick={onDeleteClick}>삭제</button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
