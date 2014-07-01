module.exports = {
    '_id': '_design/user',
    'language': 'javascript',
    'views': {
        'twitter': {
            'map': function (doc) {
                if (doc.type === 'user') {
                    emit(doc.twitter.id, doc);
                }
            }
        }
    }
};