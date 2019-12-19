import React, {useState, useEffect} from "react";
import axios from "axios";

export default function UpdateMovie(props) {

    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const changeHandler = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.history.push(`/movies/${movie.id}`);
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" name="title" id="title" onChange={changeHandler} value={movie.title}/>

            <input type="text" name="director" id="director" onChange={changeHandler} value={movie.director}/>

            <input type="text" name="metascore" id="metascore" onChange={changeHandler} value={movie.metascore}/>

            <button type="submit">Update</button>
        </form>
    )
}