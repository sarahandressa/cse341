const { client } = require('../db/config');
const { user } = require('../data/professional');
const { ObjectId } = require('mongodb');

const getProfessionalUser = async (req, res) => {
    console.log('Initial user object:', user);
    try {
        const database = client.db("professional_db");
        const collection = database.collection("professionals");

        let data = await collection.findOne();

         await collection.deleteMany({});
         data = null;

        if (!data) {
            const userWithId = {
                _id: new ObjectId(),
                professionalName: user.professionalName,
                base64Image: user.base64Image,
                nameLink: user.nameLink,
                primaryDescription: user.primaryDescription,
                workDescription1: user.workDescription1,
                workDescription2: user.workDescription2,
                linkTitleText: user.linkTitleText,
                linkedInLink: user.linkedInLink,
                githubLink: user.githubLink
            };

            await collection.insertOne(userWithId);
            data = userWithId;
        }

        res.json(data);
    } catch (e) {
        res.status(500).json({ error: `error fetching data from database` });
    }
};

module.exports = {
    getProfessionalUser
}