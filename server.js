const express = require('express')
const bodyparser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = 3000

app.use(bodyparser.json());

let defUi = uuidv4();
let newUI;

let users = [
    {
        id: defUi,
        userName: "jukkis",
        name: "jukka Hyny",
        birthDay: "2020-09-01",
        address: {
            street: "teidentie",
            postalCode: "90250",
            city: "Oulu",
            country: "FI"
        },
        email: "email@email.com",
        password: "password"
    }
];

let sensors = [
    {
        id: defUi,
        deviceType: "raspi",
        description: "raspi 3, in the tree",
        lattitude: "44 38 12.32",
        longitude: "134 12 27.11",
        sensorDataTypes: {
            humidity: true,
            temperature: false,
            rainfall: true,
            wind: false,
            cloudCoverage: true
        }
    }
];

let wData = [
    {
        id: defUi,
        timestamp: "2017-07-21T17:32:28Z",
        user: "Kari Pekkala",
        values: {
            temperature: 13.2,
            humidity: 0.34,
            rainfall: 0.2,
            wind: 2,
            cloudCoverage: 0.4
        }
    }
];

/////////////USER
//GET
app.get('/user', (req, res) => {
    res.json({users})
})

app.get('/user/:id', (req, res) => {
    const result = users.find(t => t.id == req.params.id);
    if(result !== -1) {
        users.splice(result, 1);
        res.json({result})
    } else {
        res.sendStatus(404);
    }
})

//POST
app.post('/user', (req, res) => {

    const newUser = {
        id: uuidv4(),
        userName: req.body.userName,
        name: req.body.name,
        birthDay: req.body.birthDay,
        address: {
            street: req.body.address.street,
            postalCode: req.body.address.postalCode,
            city: req.body.address.city,
            country: req.body.address.country
        },
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser);

    console.log(req.body);

    res.sendStatus(200)
})

//PUT
app.put('/user/:id', (req, res) => {
    const result = users.find(t => t.id == req.params.id);
    if(result !== undefined)
    {
        for (const key in req.body) {
            result[key] = req.body[key];
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

//DELETE
app.delete('/user/:id', (req, res) => {
    const result = users.find(t => t.id == req.params.id);
    if(result !== -1) {
        users.splice(result, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

/////////////USER LOGIN
app.post('/user/login', (req, res) => {

    const loginUser = {
        userName: req.body.userName,
        password: req.body.password
    };
    //users.push(loginUser);

    console.log(req.body);

    res.sendStatus(200)
})

/////////////SENSOR
//GET
app.get('/sensor', (req, res) => {
    res.json({sensors})
})

app.get('/sensor/:id', (req, res) => {
    const result = sensors.find(t => t.id == req.params.id);
    if(result !== -1) {
        sensors.splice(result, 1);
        res.json({result})
    } else {
        res.sendStatus(404);
    }
})


//POST
app.post('/sensor', (req, res) => {

    const newSensor = {
        id: uuidv4(),
        deviceType: req.body.deviceType,
        description: req.body.description,
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
        sensorDataTypes: {
            humidity: req.body.sensorDataTypes.humidity,
            temperature: req.body.sensorDataTypes.temperature,
            rainfall: req.body.sensorDataTypes.rainfall,
            wind: req.body.sensorDataTypes.wind,
            cloudCoverage: req.body.sensorDataTypes.cloudCoverage
        }
      };
    sensors.push(newSensor);

    console.log(req.body);

    res.sendStatus(200)
})

//PUT
app.put('/sensor/:id', (req, res) => {
    const result = sensors.find(t => t.id == req.params.id);
    if(result !== undefined)
    {
        for (const key in req.body) {
            result[key] = req.body[key];
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

//DELETE
app.delete('/sensor/:id', (req, res) => {
    const result = sensors.find(t => t.id == req.params.id);
    if(result !== -1) {
        sensors.splice(result, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

/////////////SENSOR DATA
//GET
app.get('/data', (req, res) => {
    res.json({wData});
})

app.get('/data/:id', (req, res) => {
    const result = sensors.find(t => t.id == req.params.id);
    if(result !== -1) {
        sensors.splice(result, 1);
        res.json({result})
    } else {
        res.sendStatus(404);
    }
})

app.post('/data/:id', (req, res) => {

    const newdata = {
        timestamp: req.body.timestamp,
        user: req.body.user,
        values: {
            temperature: req.body.values.temperature,
            humidity: req.body.values.humidity,
            rainfall: req.body.values.rainfall,
            wind: req.body.values.wind,
            cloudCoverage: req.body.values.cloudCoverage
        }
      };
      wData.push(newdata);

    console.log(req.body);

    res.sendStatus(200)
})

/*app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})*/

let apiInstance = null;
exports.start = () => {
    apiInstance = app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

exports.stop = () => {
    apiInstance.close();
    console.log("[API] api closed");
}
