import { useState } from "react";
export interface DogData {
  id: number;
  breed: string;
  imgUrl: string;
  dislikeCount: number;
  likeCount: number;
}

export const DogCard = ({ dogData }: { dogData: DogData }) => {
  const { imgUrl, likeCount, dislikeCount } = dogData;
  const [totalLikes, setTotalLikes] = useState<number>(likeCount);
  const [totalDisLikes, setTotalDisLikes] = useState<number>(dislikeCount);

  const addCount = (isLike: boolean) => {
    if (isLike) {
      setTotalLikes(totalLikes + 1);
    } else {
      setTotalDisLikes(totalDisLikes + 1);
    }
  };

  return (
    <div className="card">
      <img src={imgUrl} alt="Perro" />
      <br />
      <p>
        <span className="like-count">{totalLikes}</span>❤️
        <span className="dislike-count">{totalDisLikes}</span>🤮
      </p>
      <button className="like" onClick={() => addCount(true)}>
        Preciosísimo
      </button>
      <button className="dislike" onClick={() => addCount(false)}>
        Feísisimo
      </button>
    </div>
  );
};
