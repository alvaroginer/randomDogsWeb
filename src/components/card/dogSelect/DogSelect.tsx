import { useState, useEffect } from "react";
import { fetchBreeds } from "../../../functions/apiCall";

export const DogSelect = ({
  selectBreed,
}: {
  selectBreed: (breed: string) => void;
}) => {
  const [breeds, setBreeds] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectBreed(event.target.value);
  };

  useEffect(() => {
    const handleBreeds = async () => {
      const breedsList = await fetchBreeds();
      if (breedsList) {
        selectBreed(breedsList[0]);
        setBreeds(breedsList);
      }
    };

    handleBreeds();
  }, []);

  return (
    <select name="breeds" id="breeds-picker" onChange={handleChange}>
      {breeds.map((breed) => (
        <option key={breed} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  );
};
