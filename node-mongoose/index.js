const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connencted to server");

    var newDish = Dishes({
        name:"Donut",
        description: "New Test"
    });

    newDish.save()
    .then((dish) => {
        console.log("Inserted\n",dish);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log("Found\n",dishes);

        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
})