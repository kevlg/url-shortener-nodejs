import 'dotenv/config' 
import { port, host } from "./utils";
import app from "./index";

app.listen(port, host, () => {
    console.log(`Express server started on: ${host}:${port}`);
});