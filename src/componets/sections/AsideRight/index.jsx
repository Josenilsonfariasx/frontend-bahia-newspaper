import { useContext, useEffect, useState } from "react";
import img from "../../../assets/imgs/publicidade-1.jpg"
import styles from "./style.module.scss";
import { PostContext } from "../../../providers/PostContext";
import { Api } from "../../../../services/api";
import { useNavigate } from "react-router-dom";

export const AsideRight = () => {

    const {  mostViewedPosts, setLoading, setMostViewedPosts, setFilteredPost} = useContext(PostContext);

    const navigate = useNavigate();

    useEffect(() => {
        scrollTo(0, 0);
        const fetchMostViewedPosts = async () => {
            try {
                setLoading(true);
                const response = await Api.get(`/filter/post/views`);                
                const lastTenPosts = response.data.slice(0, 2);
                setMostViewedPosts(lastTenPosts)

            } catch (error) {
                console.error('Erro ao obter as postagens mais visualizadas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMostViewedPosts();
    }, []);

    const handleClick = (postId, e) => {
        e.preventDefault();
        const post = mostViewedPosts.find(post => post.id === postId);
        if (post) {
            setFilteredPost([post]);
            navigate(`/post/${postId}`);
        } else {
            console.log("Post não encontrado.");
        }
    };

    return (
        <aside className={styles.rightAside}>
            <ul>
                <h1 className="title center">MAIS LIDAS</h1>
                {mostViewedPosts.map((post) => (
                <li 
                key={post.id}>
                {/* Renderização condicional da imagem do post */}
                {post.photoUrls && post.photoUrls.map((index) => ( 
                    <img 
                        key={index} 
                        src={post.photoUrls[0] ? post.photoUrls[0] : ""}  
                        alt={`Imagem ${index}`}
                        onClick={(e) => handleClick(post.id, e)}
                    />
                ))}
                    <div className={styles.titles}> 
                        {/* Renderização condicional das categorias do post */}                
                        {post.categories && post.categories.map((category) => (
                            <h1
                                key={category.id}
                                className="title two"
                            >
                                {category.name}
                            </h1>
                        ))}
                        {/* Título do post */}
                        <p  className="paragraph small">
                            {post.title}
                        </p>
                    </div>     
                </li>
                ))}
            </ul>
            {/*  imagem estática */}
            <span>
                <img src={img} alt="" />
            </span>
        </aside>
    );
};
                    
    
                        

