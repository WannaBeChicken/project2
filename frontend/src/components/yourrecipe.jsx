import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Yourrecipe() {
  const [dishname, setDishname] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction,setInstruction] = useState('');
  const navigate = useNavigate();
  function postrecipe(ev) {
    ev.preventDefault();
    fetch("http://localhost:4000/yourrecipe", {
      method: "POST",
      body: JSON.stringify({ dishname, ingredient,instruction }),
      headers: { "Content-Type": "application/json" },
    }).then(response =>{
      navigate("/posts");
    }
    );
  }
  return (
    <div className="sharebg">
      <div className="shareyour">
        <div></div>
        <div>
          <div>
            <h4>Name Of the Dish</h4>
            <form onSubmit={postrecipe}>
              <textarea
                name="title"
                cols="30"
                rows="2"
                placeholder="Enter Name of Dish"
                value={dishname}
                onChange={(ev) => setDishname(ev.target.value)}
              ></textarea>
              <h4>Ingrediants</h4>
              <textarea
                name="ingrediants"
                cols="40"
                rows="5"
                placeholder="Enter ingrediants required"
                value={ingredient}
                onChange={(ev) => setIngredient(ev.target.value)}
              ></textarea>
              <h4>Cooking Instructions:</h4>
              <textarea name="description" cols="50" rows="10" value = {instruction} onChange={(ev) => setInstruction(ev.target.value)}></textarea>
              <div>
                {" "}
                <button type="submit">Post</button>{" "}
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
