import { useEffect, useState } from "react";
import Movie from "../components/Movie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&page=1&region=KR`
      )
    ).json();
    setMovies(json.results);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return <div>{loading ? <h1>로딩 중...</h1> : <Movie movies={movies} />}</div>;
}
