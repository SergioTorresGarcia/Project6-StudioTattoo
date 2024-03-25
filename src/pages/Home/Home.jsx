
import { Header } from "../../common/Header/Header"
import "./Home.css"

import homepageImage from './img/modern-and-creative-tattoo-parlor-with-a-chair-brutal-interior-design-photo.jpg'

export default HomePage;

export const Home = () => {
    return (
        <>
            <Header />
            <div className="homeDesign">
                <img src={homepageImage} alt="Homepage image" />
            </div>
        </>
    )
}