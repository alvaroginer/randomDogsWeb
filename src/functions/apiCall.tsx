import { DogData } from "../components/dogCard/DogCard";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getRandomDogData(
  breed: string
): Promise<DogData | undefined> {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json: { message: string; status: string } = await response.json();

    return {
      id: Math.floor(Date.now() + Math.random() * 1000),
      breed,
      imgUrl: json.message,
      dislikeCount: getRandomInt(0, 2),
      likeCount: getRandomInt(0, 1),
    };
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchBreeds(): Promise<string[] | undefined> {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return Object.keys(data.message);
  } catch (error: any) {
    console.error(error.message);
  }
}
