import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generateID, getAllFiles } from "./utilities.js";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/deploy", async (req, res) => {
    const repoURL: string = req.body.repoURL;
    console.log(repoURL);

    const id = generateID();

    //using simple git we are cloning a repo and storing it in the output folder with their id
    await simpleGit().clone(repoURL, path.join(__dirname, `output/${id}`));
    console.log("CLONING DONE!");
    

    // store all file path in an array
    const allFiles = getAllFiles(path.join(__dirname, `output/${id}`));
    console.log("All files' path stored.");


    res.json({
        id,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});


/*
id - ba26fa4a0e8e28c1b5307c54d94ebae0

secret - 5e39d15245b05eb1148ddc1cfb22dcf57ce90a66db6acd9773dc319eb1c0fc74

end-point - https://732f56d8ec1d69381f60cd9865ba8d62.r2.cloudflarestorage.com
*/