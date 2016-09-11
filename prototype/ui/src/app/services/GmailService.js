import {Email} from '../model/Email';

const gapiPromise = require('google-client-api')();

const gmailApiPromise = gapiPromise.then(gapi => {
  return new Promise((resolve, error) => {
    gapi.client.load('gmail', 'v1', resolve);
  });
});

const CLIENT_ID = '';
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
   * @returns {Promise<Void>}
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
      let request = gapi.client.gmail.users.labels.list({
        'userId': 'me'
      });
      return new Promise((resolve) => {
        request.execute(function (resp) {
          resolve(resp.labels);
        });
      });
    });
  }

  /**
   * @returns {Promise<Array<Email>>}
   */
  listMessages() {
    return Promise.all([this.checkAuth(), gmailApiPromise]).then(() => listMessages(gapi));
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

/**
 *
 * @param gapi
 * @returns {Promise<Array<Email>>}
 */
function listMessages(gapi) {
  let request = gapi.client.gmail.users.messages.list({
    'userId': 'me'
  });
  return request
    .then(response => retrieveMessagesDetails(gapi, response.result.messages.map(getMessageIdFromMessageObject)))
    .then(messages => messages.map(gmailMessageToEmailObject));
}

/**
 *
 * @param gapi
 * @param {Array<String>} messagesIds
 * @returns {Promise<Array<Object>>}
 */
function retrieveMessagesDetails(gapi, messagesIds) {
  let batch = gapi.client.newBatch();
  messagesIds.forEach((messageId) => {
    batch.add(gapi.client.gmail.users.messages.get({
      'userId': 'me',
      'id': messageId
    }));
  });
  return batch.then(response => {
    let requestIds = Object.keys(response.result);
    let messages = [];
    requestIds.forEach(requestId => messages.push(response.result[requestId].result));
    return messages;
  });
}

/**
 * @param {Object} message
 * @returns {String}
 */
function getMessageIdFromMessageObject(message) {
  return message.id;
}

/**
 * @param {Object} message
 * @returns {Email}
 */
function gmailMessageToEmailObject(message) {
  return new Email(getMessageSubject(message));
}

function getMessageSubject(message) {
  let header = message.payload.headers.find(header => header.name === 'Subject') || {value: ''};
  return header.value;
}
