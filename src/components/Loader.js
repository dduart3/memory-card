import "../styles/Loader.css";
import kunai from "../img/kunai.png";

const Loader = ({ text }) => {
  return (
    <div className="Loader">
      <img className="Loader__img rotate" src={kunai}></img>
      <p className="Loader__text">{text}</p>
    </div>
  );
};

export default Loader;
