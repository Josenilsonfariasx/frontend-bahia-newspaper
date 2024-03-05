import { Link } from "react-router-dom";
import Logo2 from "../../assets/Logo Jornal da Bahia2.png";
import styles from "./style.module.scss";
import { MdFacebook} from "react-icons/md";
import { FaInstagram, FaWhatsapp, FaSquareXTwitter} from "react-icons/fa6";

export const Footer = () => {
    return(
        <footer>
            <div className="container">
                <div className={styles.flexBox}>
                    <Link to="/">
                            <img src={Logo2} alt="Logo do jornal" width="200" />
                    </Link>
                <span>
                    <div>

                    <Link 
                        to=""
                        target="_blank"
                        rel="noopener noreferrer">
                        <FaInstagram size={25}/>
                    </Link>
                    <Link 
                        to=""
                        target="_blank" 
                        rel="noopener noreferrer">
                        <FaSquareXTwitter size={25}/>
                    </Link>
                    <Link 
                        to=""
                        target="_blank" 
                        rel="noopener noreferrer">
                        <MdFacebook size={25}/>
                    </Link>
                    <Link 
                        to=""
                        target="_blank" 
                        rel="noopener noreferrer">
                        <FaWhatsapp size={25}/>
                    </Link>
                    </div>
                        <p className="title three">Todos os direitos reservados &copy; 
                            {new Date().getFullYear()} 
                        </p>
                </span>
                </div>
            </div>
        </footer>
    );
};



