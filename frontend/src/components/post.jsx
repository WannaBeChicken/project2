export default function Post({title,ingrediants,description}) {
    return (
        <div className="potato">
            <h3>{title}</h3>
            <h4>Ingredients:</h4>

        <p>{ingrediants}</p>
        <h4>Cooking instructions:</h4>
        <p>{description}</p>
        {/* <img id="likebutton" src="like.png" alt="" onclick="changeColor()"> */}
        </div>
    );
}