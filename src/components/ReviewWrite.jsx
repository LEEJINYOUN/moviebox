import "./css/ReviewWrite.css";
import React from "react";
import { ImStarFull } from "react-icons/im";

export default function ReviewWrite({
  userInfo,
  onSubmit,
  StarCheckBox,
  starArray,
  startOnClick,
  starClicked,
  review,
  onChange,
}) {
  return (
    <div className="reviewWrite">
      {userInfo !== null ? (
        <form onSubmit={onSubmit} className="reviewForm">
          <div className="reviewTop">
            <span>평점 및 관람평 작성</span>
          </div>
          <div className="reviewMiddle">
            <StarCheckBox>
              {starArray.map((el) => (
                <ImStarFull
                  key={el}
                  onClick={() => startOnClick(el)}
                  className={starClicked[el] && "orange"}
                  size="27"
                />
              ))}
            </StarCheckBox>
          </div>
          <div className="reviewBottom">
            <textarea
              value={review}
              onChange={onChange}
              placeholder="평점 및 영화 관람평을 작성해주세요."
              required
              className="reviewWriteText"
            />
            <input type="submit" value="작성" />
          </div>
        </form>
      ) : (
        <div className="reviewNone">관람평은 로그인 후 작성 가능합니다.</div>
      )}
    </div>
  );
}
