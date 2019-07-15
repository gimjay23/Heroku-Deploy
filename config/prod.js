module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appId: process.env.APP_ID, //facebook id
    appSecret: process.env.APP_SECRET,
    mongodb: {
      uri:
        process.env.MONGODB_URI
    },
    session: {
      cookieKey: process.env.SESSION_COOKIEKEY
    }
  };