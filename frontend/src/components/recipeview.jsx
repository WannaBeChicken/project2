import { useState } from "react";

export default function RecipeView({dishname,dishcategory,dishArea,dishinst,image,youtube}) {
  return (
    <div className="container">
      <div className="v-1">
        <h2>Name</h2>
        <p>{dishname}</p>
        <h2>Category</h2>
        <p>{dishcategory}</p>
        <h2>Origin</h2>
        <p>{dishArea}</p>
        <h3>Instructions for Cooking</h3>
        <p>{dishinst}</p>
        <h4>link:</h4>
        <a href={youtube}>{youtube}</a>
      </div>
      <div className="con-2"><img src={image} alt="" /></div>
    </div>
  );
}
