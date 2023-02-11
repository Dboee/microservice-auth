// const express = require('express');
// const axios = require('axios');
// const qs = require('qs');

// class SMNAuthenticationService {
//   constructor({ clientId, clientSecret, redirectUri, financialInstitution }) {
//     this.clientId = clientId;
//     this.clientSecret = clientSecret;
//     this.redirectUri = redirectUri;
//     this.financialInstitution = financialInstitution;

//   async authenticateUser(req, res) {
//     const state = Math.floor(Math.random() * 100000000).toString();
//     const authorizeUrl = `https://api-auth.sparebank1.no/oauth/authorize?client_id=${this.clientId}&state=${state}&redirect_uri=${this.redirectUri}&finInst=${this.financialInstitution}&response_type=code`;

//     // 1. Open a browser window for user authentication and authorization
//     res.redirect(authorizeUrl);

//     // 2. Handle the redirect from the authorization server
//     const app = express();
//     app.get(this.redirectUri, async (req, res) => {
//       const { code } = req.query;
//       const response = await axios.post(
//         'https://api-auth.sparebank1.no/oauth/token',
//         qs.stringify({
//           client_id: this.clientId,
//           client_secret: this.clientSecret,
//           code,
//           grant_type: 'authorization_code',
//           state: req.query.state,
//           redirect_uri: this.redirectUri,
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       // 3. Extract the access token and refresh token
//       const { access_token, refresh_token } = response.data;

//       // 4. Save the access token and refresh token to the user in the database
//       // (implementation omitted)

//       res.send('Authentication complete');
//     });
//   }

//   async refreshAccessToken(refreshToken) {
//     const response = await axios.post(
//       'https://api-auth.sparebank1.no/oauth/token',
//       qs.stringify({
//         client_id: this.clientId,
//         client_secret: this.clientSecret,
//         refresh_token,
//         grant_type: 'refresh_token',
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     // Extract the new access token and refresh token
//     const { access_token, refresh_token: newRefreshToken } = response.data;

//     // Save the new access token and refresh token to the user in the database
//     // (implementation omitted)

//     return { access_token, refresh_token: newRefreshToken };
//   }
// }

// module.exports = SMNAuthenticationService;
