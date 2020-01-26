const { Router } = require('express');
const router = Router();
const multer = require('multer');
const fastCsv = require('fast-csv');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const fs = require('fs').promises;
const csvtojson = require('csvtojson');
const { parseAsync } = require('json2csv');
const path = require('path');

const User = require('../models/user');

// define temporary directory for uploading CSV file
const upload = multer({ dest: 'tem/csv' });

const mapUsersList = ({ _id, UserName, FirstName, LastName, Age }) => {
    return {
        id: _id,
        UserName,
        FirstName,
        LastName,
        Age
    }
    // return users.map(({ _id, UserName, FirstName, LastName, Age }) => ({ id: _id, UserName, FirstName, LastName, Age }))
}

router.get('/users', async (req, res) => {
    if (req.query.csv) {
        try {
            let users = await User.find();

            //Transform data to CSV
            const fields = ['UserName', 'FirstName', 'LastName', 'Age'];
            const opts = { fields };
            const csv = await parseAsync(users, opts);

            // write data to temp file
            const dataTime = Date.now();
            const filePath = path.join(__dirname, "..", "tem", "exports", "csv-" + dataTime + ".csv");
            await fs.writeFile(filePath, csv);

            //send data
            res.attachment(filePath);
            res.status(200).send(csv);

            // remove temp file
            await fs.unlink(filePath);
        } catch (e) {
            console.log('Error:', e);
            res.send({ message: 'Unable to load data', success: false, e });
        }
    } else {
        try {
            let users = await User.find();
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            users = users.map(mapUsersList);
            res.json(users);
        } catch (e) {
            console.log('Error :', e);
            res.send({ message: 'Unable to load data', success: false });
        }
    }
});
router.post('/upload-csv', upload.single('users'), async (req, res) => {
    if (!req.file) {
        return res.send({ message: 'File wasn\'t provided', success: false })
    }
    fastCsv.parseFile(req.file.path)
        .on("data", () => {
        })
        .on("end", async () => {
            try {
                const result = await csvtojson().fromFile(req.file.path);
                await User.deleteMany();
                await User.insertMany(result);
                await fs.unlink(req.file.path);
                res.send({ message: 'Data are successfully saved', success: true });
            } catch (e) {
                console.log('Error:', e);
                res.send({ message: 'Could not save data', success: false });
            }
        });
});


module.exports = router;