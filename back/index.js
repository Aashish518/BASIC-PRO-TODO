const express = require("express");
const app = express();
const user = require("./schema/user");
const mongodb = require("./database/db");
const cors = require('cors')

mongodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/data", async (req, res) => {
    try {
        let data = await user.findOne({ name: req.body.name });

        if (data) {
            data.count += 1;
            await data.save();
            res.status(200).send(data);
        } else {
            const newUser = new user({ name: req.body.name, count: 1 });
            await newUser.save();
            res.status(201).send(newUser);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/data", async(req, res) => {
    try {
        const data = await user.find();
        res.send(data);
    } catch (e) {
        console.log(e);
    }
})

app.delete("/data", async(req,res) => {
    try {
        const data = req.body.name;
        const check = await user.findOne({name:data});

        if (!check) {
            return res.status(404).send("not data found");
        } else {
            if (check.count === 1) {
                await user.deleteOne({ name: data });
                return res.status(204).send();
            } else {
                check.count -= 1;
                await check.save();
                return res.status(204).send();
            }
        }
        
    } catch (e) {
        console.log(e);
    }
})

app.put("/data", async(req, res) => {
    try {
        const data = req.body.data;
        const udata = req.body.new;
        const check = await user.find({ name: data });

        if (!check) {
            return res.status(404).send("not data found");
        }
        await user.updateOne({ name: data }, { $set: { name: udata } })
        res.status(200).send("User updated successfully");
    } catch (e) {
        console.log(e);
    }
})

app.listen(3000, () => {
    console.log("3000");
})