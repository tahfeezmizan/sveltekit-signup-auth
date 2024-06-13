const express = require("express");
const cors = require('cors');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://gadgetsstock-9e801.web.app',
        'https://gadgetsstock-9e801.firebaseapp.com'
    ],
    credentials: true
}
));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7utjicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
}


// middleware
const logger = (req, res, next) => {
    const logInfo = (req.method, req.url);
    next();
}

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'unauthrize access' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthrize access' })
        }
        req.user = decoded;
        next();
    })
    // console.log('verify Token MiddleWare:', token);
}

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const quriesCollection = client.db('gadgets-stock').collection('queries');
        const recommendationCollection = client.db('gadgets-stock').collection('recommendation');
        const blogPostCollection = client.db('gadgets-stock').collection('blog-post');


        // auth api
        app.post('/jwt', async (req, res) => {
            try {
                const user = req.body;
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
                res.cookie('token', token, cookieOption)
                    .send({ sucess: true });

            } catch (error) {
                console.error("Error fetching queries:", error);
                res.status(500).send("Error fetching queries");
            }
        });

        // logout
        app.post('/logout', async (req, res) => {
            try {
                const user = req.body;
                res.clearCookie('token', { ...cookieOption, maxAge: 0 })
                    .send({ sucess: true });

            } catch (error) {
                console.error("Error fetching queries:", error);
                res.status(500).send("Error fetching queries");
            }
        });


        // ----------  Get Method  ----------        
        // all queries data 
        app.get('/queries', async (req, res) => {
            try {
                // Retrieve data from the database and sort by the Fdate property in descending order
                const result = await quriesCollection.find().sort({ date: -1 }).toArray();
                res.send(result);
            } catch (error) {
                console.error("Error fetching queries:", error);
                res.status(500).send("Error fetching queries");
            }
        });

        // search query using by productName 
        app.get("/queries/:productName", async (req, res) => {
            try {
                const searchTxt = req.params.productName;
                const searchWord = searchTxt.toLowerCase().split(/\s+/);
                const regex = new RegExp(searchWord.join('|'), 'i');
                const result = await quriesCollection.find({ productName: { $regex: regex } }).toArray();
                res.send(result);

            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ error: "Something went wrong (Code:500)" });
            }
        })

        //get a single card data from bd using card id
        app.get('/queriesDetails/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await quriesCollection.findOne(query);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        //get specific data for update
        app.get('/findupdatequeries/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await quriesCollection.findOne(query);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        // get single user data using email
        app.get('/queriesuser', logger, verifyToken, async (req, res) => {
            try {
                if (req.user?.email !== req.query?.email) {
                    return res.status(403).send({ message: 'forbidden access' })
                }
                let query = {};
                if (req.query?.email) {
                    query = { email: req.query.email }
                }
                const result = await quriesCollection.find(query).sort({ date: -1 }).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // get recommendation data
        app.get('/recommendation', logger, verifyToken, async (req, res) => {
            try {
                const result = await recommendationCollection.find().toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // get all recommendation data by specific user
        app.get('/recommendation/:email', logger, verifyToken, async (req, res) => {
            try {
                const email = req.params.email;
                console.log(email);
                const query = { recommenderEmail: email };
                const result = await recommendationCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // get all all blog post
        app.get('/blog-post', async (req, res) => {
            try {
                const result = await blogPostCollection.find().toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        // ----------  Add Method  ----------

        // add queries data from user
        app.post('/queries', async (req, res) => {
            try {
                const data = req.body;
                const result = await quriesCollection.insertOne(data);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // add Recommendation data from user  
        app.post('/recommendation', async (req, res) => {
            try {
                const data = req.body;
                const result = await recommendationCollection.insertOne(data);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        // ----------  Update Method  ----------

        // update single queries item using id
        app.patch('/queriesupdate/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const item = req.body;
                const query = { _id: new ObjectId(id) };
                const data = {
                    $set: {
                        productName: item.productName,
                        brandName: item.brandName,
                        imageUrl: item.imageUrl,
                        queryTitle: item.queryTitle,
                        boycottingReason: item.boycottingReason,
                    }
                };
                const result = await quriesCollection.updateOne(query, data);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        // ----------  Delete Method  ----------

        // delete single data from my queries
        app.delete('/queriesuser/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await quriesCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

        // delete Recommendation specific data from database  
        app.delete('/recommendation/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await recommendationCollection.deleteOne(query);
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// basic server site config 
app.get('/', (req, res) => {
    res.send('Gadgets Stock Server is runing!')
});

app.listen(port, () => {
    console.log(`Gadgets Stock Server is running on ${port}`)
});

