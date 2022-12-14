import React from "react";
import { AiOutlineDelete } from "react-icons/ai"

function DeleteCard( { visit, restaurant, deleteRestaurant } ) {

    function handleDeleteCard(visit) {
    fetch(`http://localhost:4000/user/${visit.id}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(() => deleteRestaurant(visit));
    
    restaurant.map(place => {
        if (place.id === visit.id && visit.userrating !== '') {

        let revisedAvg;
        let newAvg;

        place.ratingData.splice(-1, 1);
        const lessRatings = place.ratingcount - 1;
        if (place.ratingData.length !== 0) {
        revisedAvg = place.ratingData.reduce((accumulator, value) => {
            return accumulator + value
        });
        newAvg = (revisedAvg/lessRatings);
            } else {
                newAvg = 0
            }
        fetch(`http://localhost:4000/restaurants/${place.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                ratingData: place.ratingData,
                ratingcount: lessRatings,
                rating: newAvg
            })
        })
        .then(res => res.json())
        .then(() => deleteRestaurant(visit))
    }
})
}



    return (
        <div className="delete-button">
        <button onClick={() => handleDeleteCard(visit)}><AiOutlineDelete/></button>
        </div>
    )
}

export default DeleteCard;