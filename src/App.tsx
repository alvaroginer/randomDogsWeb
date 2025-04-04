import { useEffect, useState } from "react";
import { DogCard, DogData } from "./components/dogCard/DogCard";
import { DogSelect } from "./components/card/dogSelect/DogSelect";
import { getRandomDogData } from "./functions/apiCall";
import "./index.css";
import "./App.css";

// Crear un useState que sea un objeto con el nombre de las propiedades de razas de perros y el valor pues el número de perros de esa raza
// crea otro useState con los diferentes estado sde los botones y que se vaya actualizando y añadiendo en función de los botones que hay, hay que tiparlo de la siguiente manera <Record(string: nombre de la raza): boolean (dar falso de momento)
// hay que crear un if más dentro del useEffect en el que ponga que solo se muestren las razas que sean true en el useState de allbreedsinList
// Luego hacer un {allBreedsinList.map} y poner que si el valor es mayor que uno entonces que aparezca el número
// en la función de handleAddDogs hay que añadir que se añadan las razas al useState de las razas

function App() {
  const [dogsList, setDogsList] = useState<DogData[]>([]);
  const [selectValue, setSelectValue] = useState<string>("");
  const [filteredDogList, setFilteredDogList] = useState<DogData[]>([]);
  const [isLikeActive, setIsLikeActive] = useState<boolean>(false);
  const [isDislikeActive, setIsDislikeActive] = useState<boolean>(false);
  const [listAllBreeds, setListAllBreeds] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    setFilteredDogList([...dogsList]);

    if (isLikeActive) {
      setFilteredDogList((prevFilterDogList) =>
        prevFilterDogList.filter((dog) => dog.likeCount > 0)
      );
    }

    if (isDislikeActive) {
      setFilteredDogList((prevFilterDogList) =>
        prevFilterDogList.filter((dog) => dog.dislikeCount > 0)
      );
    }
  }, [isLikeActive, isDislikeActive, dogsList]);

  useEffect(() => {
    setListAllBreeds(
      dogsList.reduce((acc: Record<string, number>, dog) => {
        const breed = dog.breed;

        acc[breed] = (acc[breed] || 0) + 1;
        return acc;
      }, {})
    );
  }, [dogsList]);

  const handleAddDogs = async (value: number, start: boolean) => {
    let i: number;
    for (i = 0; i < value; i++) {
      const newDog = await getRandomDogData(selectValue);
      console.log(newDog);
      const newDogBreed: string = newDog?.breed;

      //Aquí añadimos las razas al objeto de las razas en la lista
      //Problema, cuando añadimos 5 perros el listado no se actualiza
      if (listAllBreeds[newDogBreed]) {
        setListAllBreeds((prevListAllBreeds) => ({
          ...prevListAllBreeds,
          [newDogBreed]: prevListAllBreeds[newDogBreed] + 1,
        }));
      } else {
        setListAllBreeds((prevListAllBreeds) => ({
          ...prevListAllBreeds,
          [newDogBreed]: 1,
        }));
      }

      //Aquí decidimos donde añadir el perro
      if (start) {
        setDogsList((prevDogs) => [newDog, ...prevDogs]);
      } else {
        setDogsList((prevDogs) => [...prevDogs, newDog]);
      }
    }
  };
  console.log(listAllBreeds);

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
        <button
          id="like-filter"
          className={isLikeActive ? "filter-selected" : ""}
          onClick={() => setIsLikeActive(!isLikeActive)}
        >
          Preciosisimos ❤️
        </button>
        <button
          id="dislike-filter"
          className={isDislikeActive ? "filter-selected" : ""}
          onClick={() => setIsDislikeActive(!isDislikeActive)}
        >
          Feísimos 🤮
        </button>
      </div>
      <div className="breed-filters">
        <p> Filter by breed:</p>
        {Object.keys(listAllBreeds).map((breed) => {
          return (
            <button key={breed}>
              {listAllBreeds[breed] < 1
                ? `${breed}`
                : `${breed} (${listAllBreeds[breed]})`}
            </button>
          );
        })}
      </div>
      <div id="dog-list">
        {!isLikeActive && !isDislikeActive
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
