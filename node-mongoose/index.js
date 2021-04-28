const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connencted to server");

    Dishes.create({
        name:"Pizzaasasd",
        description: "New Test"
    })
    .then((dish) => {
        console.log("Inserted\n",dish);

        return Dishes.findByIdAndUpdate(dish._id,{$set:{description:"Updated Test"}},{new:true}).exec();
    })
    .then((dish) => {
        console.log("Found\n",dish," commenst: ",dish.comments);
        dish.comments.push({
            rating:10,
            comment:'I\'m getting a sinking feeling!',
            author:"Georgi Aleksiev"
        });

        return dish.save();
    }).then((dish) => {
        console.log(dish);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
})