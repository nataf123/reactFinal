const { google } = require('googleapis');

const googleConfig = {
    clientId: 'asdfghjkljhgfdsghjk.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: '_ASDFA%DFASDFASDFASD#FAD-', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'http://localhost:3000/google-auth' // this must match your google api settings
  };
  
  const defaultScope = [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email',
    ];
  
  

function createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  }
  
  function getConnectionUrl(auth) {
      return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', 
        scope: defaultScope
      });
    }

    function getGooglePlusApi(auth) {
        return google.plus({ version: 'v1', auth });
      }
  
     function urlGoogle() {
      const auth = createConnection(); 
      const url = getConnectionUrl(auth);
      return url;
    }
  

 async function getGoogleAccountFromCode(code){
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
    };
  }

  module.exports = {urlGoogle, getGoogleAccountFromCode};