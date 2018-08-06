MockBrest = {

    settings: {
        sqlite: require('../settings')
    },

    getSetting: function(tag) {
        return MockBrest.settings[tag];
    }

};

module.exports = MockBrest;
