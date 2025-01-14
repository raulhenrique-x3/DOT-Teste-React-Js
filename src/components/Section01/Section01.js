import '../Section01/section01.css'
import { Button } from "../Button/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import useFavorites from '../../hooks/useFavorites';

const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=6837309d019c7c2ec27c9f29d7f960a4'
const API_IMG = 'https://image.tmdb.org/t/p/w500/'

const Section01 = () => {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get(API_URL)
            .then((res) => {
                setMovies(res.data.results)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    function formatDate(dateToFormat) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateToFormat).toLocaleDateString("pt-br", options).split(' de ');
        const returnDate = date[0] + ' de ' + date[1] + ', ' + date[2];
        return returnDate;
    }

    const {updateFavorites} = useFavorites()
    const handleAddFav = (movie) => {
        updateFavorites('add', { id: movie?.id, qnt: 1, price: 79.99, title: movie?.title, img: movie?.poster_path })
    }


    return (
        <section className="section01">
            <div className="movies">
                {!!movies.length && movies.map((movie) =>
                    <div key={movie.id} className='figureMovie'>
                        <div className="movieImgRelease">
                            <svg onClick={() => handleAddFav(movie)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                            <img src={API_IMG + movie.poster_path} className='movieImg' alt={movie.title} />
                            <p>{formatDate(movie.release_date)}</p>
                        </div>
                        <div className="movieInfo">
                            <h4>{movie.title}</h4>
                            <div className="movieRate">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                                <p className="movieAvg">{movie.vote_average}</p>
                                <p className="movieVote">Gênero</p>
                            </div>
                            <p>R$79.99</p>
                        </div>

                        <Button txt='Adicionar' movie={movie} />
                    </div>)}
            </div>
        </section>
    )
}

export default Section01;