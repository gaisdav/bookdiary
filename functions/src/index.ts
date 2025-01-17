/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import {auth} from 'firebase-functions/v1';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.onUserCreate = auth.user().onCreate((user) => {
  logger.info('User onCreate!', user);
});

exports.onUserDelete = auth.user().onDelete((user) => {
  logger.info('User onDelete!', user);
});

exports.onCall = onCall((request) => {
  logger.info('User onCall!', request);
  logger.info('User onCall!', request.auth);
});
