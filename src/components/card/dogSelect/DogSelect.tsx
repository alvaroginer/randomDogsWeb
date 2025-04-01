import { useState, useEffect } from "react";

export const DogSelect = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setBreeds(Object.keys(data.message));
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchBreeds();
  }, []);

  return (
    <select name="breeds" id="breeds-picker" onChange={onChange}>
      <option value="">Selecciona una raza</option>
      {breeds.map((breed) => (
        <option key={breed} value={breed}>
          {breed}
        </option>
      ))}
    </select>
  );
};
