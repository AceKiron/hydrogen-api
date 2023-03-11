import "dotenv/config";

import Express from "express";
import Cors from "cors";

const App: Express.Application = Express();

App.use(Cors({
    origin: (origin, callback) => {
        callback(null, true);
    }
}));

App.use(Express.json());

async function RegisterRoute(Route: string) {
    try {
        App.get(Route, (await import(`./routes${Route}.js`)).default);
    } catch (e) {
        App.get(Route, (await import(`./routes${Route}.ts`)).default);
    }
}

RegisterRoute("/savings");

App.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}.`);
});