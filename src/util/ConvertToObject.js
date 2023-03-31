module.exports = {
    mutipleMongooseToObject: (mongooses) => {
        return mongooses.map((m) => m.toObject());
    },
    mongooseToObject: (m) => {
        return m ? m.toObject() : m;
    },
};
