import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import patient from "./patient.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var customersArray = [];
customersArray.push(new patient(1, "false"));
var counterId = 1;

app.use(express.urlencoded({ extended: true }));

function checkPatientExists(customersArray, customerId) {
    return customersArray.find(customer => customer.id == customerId) !== undefined;
}
function createId(boolean){
    customersArray.push(new patient(counterId, boolean));
    console.log("IdCounter: " + counterId);
}
function hasId(req, res, next) {

    next();
}

app.get("/", (req, res) => {
    /* res.sendFile(__dirname + "/public/index.html"); */
    res.send("Hi");
});

app.post("/", (req, res) => {
    const checkedId = req.body["customerId"];
    const emergency = req.body["emergency"];
    
    if (checkPatientExists(customersArray, checkedId)) {
        res.send(`Your ID is correct, Happy to see you!`);
    } else if (emergency == "true") {
        //something
        createId("true");
        res.send(`No ID found, but... EMERGENCY!!! Your ID: ` + customersArray[counterId++].id);
        
    } else {
        createId("false");
        res.send(`No ID found, see you tomorrow. Your ID: ` + customersArray[counterId++].id);   
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
