import React, { useState } from "react";
import { AiOutlineFieldNumber, AiOutlineCheck } from "react-icons/ai"

export default function UserRating( { myVisits, visit, ratePlace, setRatePlace, handleVisit } ) {

    const [renderRate, setRenderRate] = useState("")

    function handleClick(id) {
            if (visit.id === id) {
                if (renderRate === "") {
                    alert('please choose a number')
                } else {
                if (visit.userrating === "") {
                const newRenderRate = [...visit.ratingData, parseInt(renderRate)];
                const sumArray = newRenderRate.reduce((accumulator, value) => {
                    return accumulator + value
                }, 0);
                const customerCount = (parseInt(visit.ratingcount) + 1)
                const newRating = (sumArray / customerCount)
            fetch(`http://localhost:4000/restaurants/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    rating: newRating,
                    ratingData: newRenderRate,
                    ratingcount: customerCount
                })
            })
            .then(res => res.json())
            .then(res => handleVisit(res))
            fetch(`http://localhost:4000/user/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    userrating: parseInt(renderRate),
                    rating: newRating,
                    ratingData: newRenderRate,
                    ratingcount: customerCount
                })
            })
            .then(res => res.json())
            .then(res => handleVisit(res))
        }
        else if (visit.userrating !== "") {
            alert('you already rated this restaurant')
        }}
    }
    setRenderRate('')
    setRatePlace(null)
    return visit;
    }

    return (
        <a className="rating-button">
        {visit.id === ratePlace ? (
            <>
            <select onChange={(e) => setRenderRate(e.target.value)}>
                <option value="">   </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button onClick={() => handleClick(visit.id)}><AiOutlineCheck/></button>
            </>
        ) : (
        <button onClick={() => setRatePlace(visit.id)}><AiOutlineFieldNumber/></button>
        )}
        </a>
    )
}