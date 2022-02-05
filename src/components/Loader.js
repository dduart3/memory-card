import "../styles/Loader.css";
import kunai from "../img/kunai.png";

const Loader = ({ level }) => {
  return (
    <div className="Loader">
      <img className="Loader__img rotate" src={kunai}></img>
      <p className="Loader__text">Loading lvl {level}</p>
    </div>
  );
};

export default Loader;
