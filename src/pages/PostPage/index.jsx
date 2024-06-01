import { PostSection } from "../../componets/sections/PosteSection";
import styles from "./style.module.scss";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostContext";
import { DefaultTemplate } from "../../componets/DefaultTemplate";
import { useParams } from "react-router-dom";
import { Api } from "../../../services/api";
import Spinner from "react-bootstrap/Spinner";


// Função para renderizar o conteúdo com tags HTML
const renderContentWithHTML = (content) => {
    return { __html: content }; // Define o conteúdo como HTML seguro
};


export const PostPage = () => {
    const { loading, setLoading, filteredPost } = useContext(PostContext);
    const [postContent, setPostContent] = useState('');

    const { id } = useParams();


    useEffect(() => {
        window.scrollTo(0, 0);
        const getPostById = async () => {
            try {
                setLoading(true);
                const response = await Api.get(`/post/${id}`);
                if (response.data && response.data.content) {
                    setPostContent(response.data.content); 
                }                      
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getPostById();
    }, [id, setLoading]);


    return (
        <DefaultTemplate>
            <div className={styles.postPage}>
                {loading ? (
                    <Spinner  animation="border" role="status" />
                    
                ) : (
                    <>
                    {filteredPost && filteredPost.length> 0 && filteredPost[0].published ?  (
                        <PostSection post={filteredPost[0]} />
                    ) : (
                        <p className="title three">Escolha uma Notícia.</p>
                    )}
                        {/* <div dangerouslySetInnerHTML={renderContentWithHTML(postContent)}/> */}
                    </>
                )}
            </div>
        </DefaultTemplate>
    );
};

