import { useEffect, useState } from "react";
import { DogCard, DogData } from "./components/dogCard/DogCard";
import { DogSelect } from "./components/card/dogSelect/DogSelect";
import { getRandomDogData } from "./functions/apiCall";
import "./index.css";
import "./App.css";

function App() {
  const [dogsList, setDogsList] = useState<DogData[]>([]);
  const [selectValue, setSelectValue] = useState<string>("");
  const [filteredDogList, setFilteredDogList] = useState<DogData[]>([]);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

  const handleAddDogs = async (value: number, start: boolean) => {
    let i: number;
    for (i = 0; i < value; i++) {
      const newDog = await getRandomDogData(selectValue);
      console.log(newDog);
      if (start) {
        setDogsList((prevDogs) => [newDog, ...prevDogs]);
      } else {
        setDogsList((prevDogs) => [...prevDogs, newDog]);
      }
    }
  };

  useEffect(() => {
    setFilteredDogList([...dogsList]);
    if (filterbyLike) {
      setFilteredDogList(filteredDogList.filter((dog) => dog.likeCount > 0));
    }

    if (!filterbyLike) {
      setFilteredDogList(filteredDogList.filter((dog) => dog.dislikeCount > 0));
    }
  }, [dogsList, filteredDogList]);

  console.log("lista sin filtrar", dogsList);
  console.log("lista filtrada", filteredDogList);

  return (
    <>
      <h1>Votalperrico</h1>
      <div>
        Selecciona la raza del perro que quieras añadir
        <DogSelect selectBreed={setSelectValue} />
      </div>
      <p id="add-warning" style={{ display: "none" }}>
        Pulsa algún botón para añadir perricos
      </p>
      <button
        id="add-1-perrico"
        className="add-button"
        onClick={() => handleAddDogs(1, false)}
      >
        Añadir 1 perrico al final
      </button>
      <button
        id="add-1-perrico-start"
        className="add-button"
        onClick={() => handleAddDogs(1, true)}
      >
        Añadir 1 perrico al principio
      </button>
      <button
        id="add-5-perricos"
        className="add-button"
        onClick={() => handleAddDogs(5, false)}
      >
        Añadir 5 perricos más
      </button>
      <button id="test">probar api</button>
      <div className="filters">
        <span> Filter by: </span>
        <button id="like-filter" onClick={() => true}>
          Preciosisimos ❤️
        </button>
        <button id="dislike-filter" onClick={() => false}>
          Feísimos 🤮
        </button>
      </div>
      <div className="breed-filters" style={{ display: "none" }}>
        <span> Filter by breed: </span>
      </div>
      <div id="dog-list">
        {!isFilterActive
          ? dogsList.map((dog: DogData) => {
              return <DogCard key={dog.id} dogData={dog} />;
            })
          : filteredDogList.map((dog: DogData) => {
              return <DogCard key={dog.id} dogData={dog} />;
            })}
      </div>
    </>
  );
}

export default App;
