const gapiPromise = require('google-client-api')();

const gmailApiPromise = gapiPromise.then(gapi => {
  return new Promise((resolve, error) => {
    gapi.client.load('gmail', 'v1', resolve);
  });
});

const CLIENT_ID = 'YOUR_CLIENT_ID';
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const authorizationObject = {
  'client_id': CLIENT_ID,
  'scope': SCOPES.join(' '),
  'immediate': true
};

export class GmailService {

  /**
   * Check if current user has authorized this application.
   * @see <a href="https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauthauthorizeparams--------callback">Documentation for gapi.auth.authorize</a>
   * @returns {Promise<boolean>}
   */
  checkAuth() {
    return new Promise((resolve, reject) => {
      const authResultCallback = authResult => handleAuthResult(authResult, resolve, reject);
      gapiPromise.then(gapi => {
        // TODO: Doc states that gapi.auth.authorize is Deprecated!
        gapi.auth.authorize(authorizationObject, authResultCallback);
      });
    });
  }

  /**
   * @typedef {{id: string, name: string, type: string}} Label
   * @returns {Promise<Array<Label>>}
   */
  listLabels() {
    return Promise.all([this.checkAuth(), gmailApiPromise]).then(() => {
      var request = gapi.client.gmail.users.labels.list({
        'userId': 'me'
      });
      return new Promise((resolve) => {
        request.execute(function (resp) {
          resolve(resp.labels);
        });
      });
    });
  }

}

/**
 * Handle auth result a resolve or reject a promise
 * @param {Object} authResult
 * @param {Function} resolve
 * @param {Function} reject
 */
function handleAuthResult(authResult, resolve, reject) {
  if (authResult && !authResult.error) {
    resolve();
  }
  reject(authResult.error);
}
