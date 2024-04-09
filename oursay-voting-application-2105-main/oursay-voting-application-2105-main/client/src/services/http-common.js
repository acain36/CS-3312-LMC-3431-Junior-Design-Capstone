import axios from "axios";

export default axios.create({
    baseUrl: "https://oursay2.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});