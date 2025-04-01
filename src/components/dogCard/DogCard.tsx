export interface DogData {
  id: number;
  breed: string;
  imgUrl: string;
  dislikeCount: number;
  likeCount: number;
}

export const DogCard = (props: DogData) => {
  const { imgUrl, likeCount, dislikeCount } = props;

  return (
    <div className="card">
      <img src={imgUrl} alt="Perro" />
      <br />
      <p>
        <span className="like-count">{likeCount}</span>❤️
        <span className="dislike-count">{dislikeCount}</span>🤮
      </p>
      <button className="like">Preciosísimo</button>
      <button className="dislike">Feísisimo</button>
    </div>
  );
};
