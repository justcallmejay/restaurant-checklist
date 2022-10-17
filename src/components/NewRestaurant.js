import React, { useState } from "react";
import { addRestImg } from "../image.js"

function NewRestaurant( { handleNewRestaurant, addRestaurant, setAddRestaurant, initialStateForm } ) {

const [thanks, setThanks] = useState('')

const handleOnChange = (e) => {
    const { name, value } = e.target;

setAddRestaurant(restaurant => {
    return {
        ...restaurant,
        [name]: value
        }
    })
}

function handleSubmit(e) {
    e.preventDefault();

    const renderThanks = () => {
        setThanks('Thank you for your submission!')
    }

    if (addRestaurant.name === "" && addRestaurant.location === "" && addRestaurant.rating === "") {
        alert('Please fill in the boxes below')
    } else {
    handleNewRestaurant(addRestaurant)
    setAddRestaurant(initialStateForm)
    fetch('http://localhost:4000/restaurants', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            ...addRestaurant,
            location: parseInt(addRestaurant.location),
            rating: parseInt(addRestaurant.rating),
            ratingData: [parseInt(addRestaurant.rating)],
            comment: "",
            ratingcount: 1
        })
    })
    fetch('http://localhost:4000/user', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            ...addRestaurant,
            location: parseInt(addRestaurant.location),
            rating: parseInt(addRestaurant.rating),
            ratingData: [parseInt(addRestaurant.rating)],
            comment: "",
            ratingcount: 1,
            userrating: parseInt(addRestaurant.rating),
            visit: parseInt(0)
        })
    })
    renderThanks();
    }
}

//Needs to render (ie: run GET request)


return (
    <>
    <form className="restaurant-list" onSubmit={handleSubmit}>
    <img src={addRestImg }/>
        <h3>Discovered a New Restaurant?  Tell us below!</h3>
        <p>After submission, we will search for the restaurant to ensure information provided are correct and up-to-date.  Thank you for helping us grow our site!</p>
        <div className="text-info">Restaurant Name:&nbsp;
        <input 
        className="input-box" 
        type="text" 
        name="name" 
        placeholder="Restaurant Name" 
        value={addRestaurant.name} 
        onChange={handleOnChange}/>
        </div>
        <div className="text-info">Distance (in miles):&nbsp;
        <input 
        className="input-box" 
        type="text" 
        name="location" 
        placeholder="Restaurant Location" 
        value={addRestaurant.location} 
        onChange={handleOnChange}/>
        </div>
        <div className="text-info">Image:&nbsp;
        <input 
        className="input-box" 
        type="text" 
        name="image" 
        placeholder="Add image link (optional)" 
        value={addRestaurant.image} 
        onChange={handleOnChange}/>
                </div>
        <div className="text-info">Type:&nbsp;
        <select 
        value={addRestaurant.description} 
        onChange={handleOnChange}>
            <option value=""></option>
            <option value="beef">Beef</option>
            <option value="burger">Burger</option>
            <option value="chicken">Chicken</option>
            <option value="dessert">Dessert</option>
            <option value="diner">Diner</option>
            <option value="fish">Fish</option>
            <option value="gyro">Gyro</option>
            <option value="pizza">Pizza</option>
            <option value="sushi">Sushi</option>
            <option value="taco">Taco</option>
            <option value="vegan">Vegan</option>
            <option value="veggie">Veggie</option>
        </select>
        <div className="text-info">Price:&nbsp;
            <select name="price" value={addRestaurant.price} onChange={handleOnChange}>
                <option value=""></option>
                <option value="$">$</option>
                <option value="$$">$$</option>
                <option value="$$$">$$$</option>
            </select></div>
        <div className="text-info">Your rating:&nbsp;
            <select name="rating" value={addRestaurant.rating} onChange={handleOnChange}>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select></div>
        <div><button>Submit</button></div>
        <div><h4>{thanks}</h4></div>
        </div>
    </form>
    </>
    )
}

export default NewRestaurant;