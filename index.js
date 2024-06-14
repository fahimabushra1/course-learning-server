const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/users',(req,res)=>{
    res.send('<><><>users<><><>')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


// bushraarifeen
// qIKP9ek2coG5tLYI



const uri = "mongodb+srv://bushraarifeen:qIKP9ek2coG5tLYI@cluster0.mybqtu2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const products = client.db("productDB");
    const courses = products.collection("courses");
   
    app.post('/courses', async(req,res)=>{
        const product = req.body;
        console.log(product)
        const result = await courses.insertOne(product);
        res.send(result)
       })

       app.get('/courses', async(req,res)=>{
        const coursesData = courses.find();
        const result =  await coursesData.toArray();
        res.send(result)
       })

       app.get('/courses/:id', async (req,res)=>{
        const id = req.params.id;
        const coursesData = await courses.findOne({_id: new ObjectId(id)});
        res.send(coursesData);
      })

      app.patch('/courses/:id', async (req,res)=>{
        const id = req.params.id;
        const updatedData = req.body;
        const result = await courses.updateOne({_id:new ObjectId(id)},
        {set: updatedData}
      );
        res.send(result);
      })

      app.delete('/courses/:id', async (req,res)=>{
        const id = req.params.id;
        const result = courses.deleteOne({_id:new ObjectId(id)});
        res.send(result);
      })

    console.log("successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
