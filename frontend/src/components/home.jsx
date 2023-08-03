import React from "react";
import img2jpeg from "./images/img-2.jpeg";
import img3jpeg from "./images/img-3.jpeg";
import img4jpeg from "./images/img-4.jpeg";
import g1jpeg from "./images/G-1.jpeg";
import g3jpeg from "./images/G-3.webp";
import g4jpeg from "./images/G-4.jpeg";
import g5jpeg from "./images/G-5.jpeg";
import g6jpeg from "./images/G-6.jpeg";
import g7jpeg from "./images/G-7.webp";
import g8jpeg from "./images/G-8.webp";
import g9jpeg from "./images/G-9.jpeg";
import g10jpeg from "./images/G-10.jpeg";
import cook1 from "./images/cook1.jpeg";
import cook2 from "./images/cook2.webp";
import cook4 from "./images/cook-4.jpeg";

export default function Home(){
    return (
        <div>
            <div class="forbg">
                <div class="main-content">
                    <div></div>
                    <div class="con1">
                        <h2>Get The Best Recipes</h2>
                        <p>An extravagenza of great recipes of food that will keep you awestruck and coax you to try them in your kitchens.
                            You can also share your unique recipes and have them circulated worldwide. </p>
                        <h3>Happy Cooking!!</h3>
                    </div>
                    <div></div>
                </div>
            </div>

            <div class="about">
                <div class="search">
                <a href="/recipe"><img src={img2jpeg} alt="" />
                    <p>Check out varities of dishes</p>
                </a>     

                </div>
                <div class="share">
                <a href="/yourrecipe"><img src={img3jpeg}  alt="" />
                    <p>Share your own recipes</p>
                </a> 

                </div>
                <div class="explore">
                <a href="/posts"><img src={img4jpeg}  alt="" />
                    <p>Neumerous personalized recipes</p>
                </a>

                </div>
            </div>
            
            <div class="work"> </div>
            
            <div class="galhead"><h2>Galleria</h2> </div>
    <div class="gllery">
        <div></div>
        <div class="picture">
            <div class="firstrow">
                <div class="effect"> <img src={g1jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">Breakfast</div>
                    </div>
                </div>
                <div class="effect"> <img src={g4jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">Healthy Salad</div>
                    </div>
                </div>
                <div class="effect"> <img src={g3jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">Nutritious Food</div>
                    </div>
                </div>
            </div>
            <div class="secondrow">
                <div class="effect"> <img src={g5jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">Delicious Burgers</div>
                    </div>
                </div>
                <div class="effect"> <img src={g8jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">Homemade</div>
                    </div>
                </div>
                <div class="effect"> <img src={g7jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">Indian</div>
                    </div>
                </div>
            </div>
            <div class="thirdrow">
                <div class="effect"><img src={g9jpeg} alt="" />
                    <div class="overlay"><div class="fact">Italian</div></div>
                </div>
                <div class="effect"><img src={g6jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">Chinese</div>
                    </div>
                </div>
                <div class="effect"> <img src={g10jpeg} alt="" />
                    <div class="overlay">
                        <div class="fact">American</div>
                    </div>
                </div>
            </div>
        </div>
        <div></div>
    </div>

    <div class="testimonial">
        <div></div>
        <div class="contentcook">
        <div class="cook1">
            
            <img src={cook1} alt="" />
            <div>
            <h3>Cooking leads to more mindful eating.
            </h3>
            <p>According to studies, people eat more mindful portions when they make home-cooked meals. While there’s so much in life we cannot control, cooking puts you in control of every ingredient you use and the portions you eat.  

            </p>
        </div>
        </div>
        <div class="cook2">

            <div>
            <h3>Your plates might make a difference in your taste.</h3>
            <p>
                According to NPR, “In general, round, white plates tend to enhance sweet flavors in food, whereas black, angular plates tend to bring out more savory flavors… And serving food on a red plate tends to reduce the amount diners eat.” Now you know! 
            </p>
        </div>
        <img src={cook2} alt="" />
        </div>
        <div class="cook3">
            <img src={cook4} alt="" />
            <div>
            <h3>Salt is a universal flavor enhancer.</h3>
            <p>Adding salt is a flavor enhancer shown to improve the “sensory properties'' of essentially every food. So if you want to cut down on your salt intake, it’s recommended to dial it back slowly in your cooking practices while also skipping processed food, cutting back on condiments, and dialing up peppers to substitute for flavor.  </p>
        </div>
        
        </div>
    </div>
    <div></div>

    </div>    
    </div>
    )
}