const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// ! This function will delete everything in the database
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6224119b03cb7cefc959ca80',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description:
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsum est atque numquam ipsam veritatis nostrum voluptatem ut. Eligendi natus quis velit consequatur quasi asperiores nemo vero fuga voluptatem autem!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/corey-mccoy/image/upload/v1660012278/YelpCamp/vbbycpe02yqazsq9rp4j.jpg',
                    filename: 'YelpCamp/y2bzwxoenu2plnxkkobn',
                },
                {
                    url: 'https://res.cloudinary.com/corey-mccoy/image/upload/v1660012817/YelpCamp/pkpxbaejcsasozqgaj2x.jpg',
                    filename: 'YelpCamp/x5vrvo681xi9emboveja',
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
