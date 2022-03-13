const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { Thought, User } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);



//Get all users
app.get('/api/users', (req, res) => {
    User.find()
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

//Get single user by id
app.get('/api/users/:userId', ({ params }, res) => {
    User.findById(params.userId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
})

// Create a new user
app.post('/api/users', ({ body }, res) => {
    User.create(body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

//Update a user by id
app.put('/api/users/:userId', ({ params, body }, res) => {
    User.findByIdAndUpdate(params.userId, body, { new: true })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
});

//delete a user by id
app.delete('/api/users/:userId', ({ params }, res) => {
    User.findByIdAndDelete(params.userId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
})

//get all thoughts
app.get('/api/thoughts', (req, res) => {
    Thought.find()
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

//get thought by id
app.get('/api/thoughts/:thoughtId', ({ params }, res) => {
    Thought.findById(params.thoughtId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
})

//create a new thought
app.post('/api/thoughts', ({ body }, res) => {
    const userId = body.userId
    Thought.create(body)
        .then(({ _id }) => {
            return User.findByIdAndUpdate(
                userId,
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((userData) => {
            res.json(userData)
        })
        .catch((err) => {
            res.json(err);
        });
});

//Update a thought by id
app.put('/api/thoughts/:thoughtId', ({ params, body }, res) => {
    Thought.findByIdAndUpdate(params.thoughtId, body, { new: true })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });

});

//delete a thought by id
app.delete('/api/thoughts/:thoughtId', ({ params }, res) => {
    Thought.findByIdAndDelete(params.thoughtId)
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
})

//create a reaction stored in a single thought's reactions array
app.post('/api/thoughts/:thoughtId/reactions', ({ params, body }, res) => {
    Thought.findByIdAndUpdate(
            params.thoughtId, 
            {$push: { reactions: body }}, 
            { new: true }
        )
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err);
        });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


