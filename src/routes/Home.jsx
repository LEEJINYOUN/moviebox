import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import { authService } from "../FireBase";

export default function Home() {
  const onLogOutClick = () => {
    authService.signOut();
    window.localStorage.clear();
    window.location.replace("/");
  };
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&page=1&region=KR`
      )
    ).json();
    setMovies(json.results);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      {localStorage.getItem("userInfo") === null ? (
        <Link to="/login">로그인</Link>
      ) : (
        <button onClick={onLogOutClick}>로그아웃</button>
      )}
      <Movie movies={movies} />
    </>
  );
}
