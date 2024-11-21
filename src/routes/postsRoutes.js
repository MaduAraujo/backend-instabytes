import express from "express";
import multer from "multer";
import { listarPosts, getPostPorID, postarNovoPost, uploadImagem} from "../controllers/postsController.js";

// comando padrão do multer para windows
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define o diretório de destino
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});

const upload = multer({dest: "./uploads", storage});

const routes = (app) =>{
    // Indica para o express que ele deve usar Json nas requisições
    app.use(express.json());

    // rota para pegar todos os posts 
    app.get("/posts", listarPosts);

    // rota para buscar um post por ID
    app.get("/posts/:id", getPostPorID);

    // rota para salvar um novo post
    app.post("/posts", postarNovoPost);

    // rota para salvar uma imagem de um post
    app.post("/upload", upload.single("imagem"), uploadImagem);

}

export default routes;