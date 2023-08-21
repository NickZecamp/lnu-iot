const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Chart = require('chart.js');
const {model} = require("mongoose");
const fs = require('fs').promises;
const Record = require("../models/Record");
const dayjs = require('dayjs');

async function chartService() {

    async function fetchTemperatureRecords() {
        const result = await Record.find().sort({date: -1}).limit(50);

        const temperatures = result.map(record => record.labels.temperature);
        const timestamps = result.map(record => record.date);

        return { temperatures, timestamps };
    }

    const data = await fetchTemperatureRecords();

    const formattedTimestamps = data.timestamps.map(timestamp => dayjs(timestamp).format('mm:ss'));


    const width = 900; //px
    const height = 700; //px
    const backgroundColour = 'black'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});

    const configuration = {
        type: 'line',
        data: {
            labels: formattedTimestamps, // generate labels,
            datasets: [{
                label: 'Temperature',
                data: data.temperatures,
                borderWidth: 2,
                borderColor: 'white'
            }]
        },
        options: {
        },
        plugins: [{
            id: 'background-colour',
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, width, height);
                ctx.restore();
            }
        }]
    };

    const chartCallback = (ChartJS) => {
        ChartJS.defaults.responsive = true;
        ChartJS.defaults.maintainAspectRatio = false;
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    await fs.writeFile('./data.png', buffer, 'base64');
}

module.exports = chartService;
