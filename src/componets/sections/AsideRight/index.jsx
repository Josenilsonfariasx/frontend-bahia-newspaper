import { useContext } from "react";
// import { PostContext } from "../../../providers/PostContexto";
import styles from "./style.module.scss";
import { imgList } from "../../../data";
import { Link } from "react-router-dom";

export const AsideRight = () => {

    const limitedImgList = imgList.slice(0,2);
    return (
        <aside className={styles.rightAside}>
            <ul>
                <h1 className="title center">MAIS LIDAS</h1>
                {limitedImgList.map((obj, index) => (
                <li key={index}>
                    <img src={obj.image}/>
                    <Link className="link">{obj.category.charAt(0).toUpperCase() 
                        + obj.category.slice(1)}
                    </Link>
                    <p className="paragraph small">{obj.title}</p>
                </li>
                ))}
            </ul>
            <div>
                <h1 className="paragraph bold">adSense</h1>
            </div>
        </aside>
    );
};
