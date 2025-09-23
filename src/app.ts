import path from "path";
import { fileURLToPath } from "url";
import express, {type Request, type Response} from 'express'
import hbs from "hbs";
import {geocode} from "./utils/geocode.js";
import type {GeocodeResult} from "./utils/geocode.js";
import {forecast} from "./utils/forecast.js";

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', path.join(viewsDirectoryPath))
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("/", (req: Request, res: Response) => {
    res.render("index", {
        title: "Weather",
        name: "Andrew Mead"
    })
});

app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req: Request, res: Response) => {
    res.render('help', {
        message: 'Help',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req: Request, res: Response) => {
    const address= req.query.address;

    if (!address || typeof address !== 'string') {
        return res.send({
            error: "Please enter a valid address"
        });
    }

    geocode(address, (error: string | undefined, {latitude, longitude, location}: GeocodeResult = {latitude: "", longitude: "", location: ""}): void  => {
        if(error) {
            res.send({error})
            return
        }
        forecast(latitude,longitude, (error: string | undefined, forecastData: string | undefined): void => {
            if(error) {
                res.send({error})
                return
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/help/*splat', (req: Request, res: Response) => {
    res.render('error', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.get('/*splat', (req: Request, res: Response) => {
    res.render('error', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.listen(3030, () => {
    console.log('Server started on port 3030')
})