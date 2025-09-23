import path from "path";
import { fileURLToPath } from "url";
import express, {} from 'express';
import hbs from "hbs";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine and views directory
app.set('view engine', 'hbs');
app.set('views', path.join(viewsDirectoryPath));
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Andrew Mead"
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help',
        title: 'Help',
        name: 'Andrew Mead'
    });
});
app.get('/weather', (req, res) => {
    res.send({
        forecast: "Weather is currently sunny",
        location: "New York"
    });
});
app.get('/help/*splat', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Andrew Mead'
    });
});
app.get('/*splat', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Andrew Mead'
    });
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
//# sourceMappingURL=app.js.map