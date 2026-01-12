import express from 'express';
import axios from 'axios';
import { getZohoAccessToken } from './zohoAuth.js';

const router = express.Router();

router.post('/submit-medical-form', async (req, res) => {
  try {
    const accessToken = await getZohoAccessToken();

    const zohoResponse = await axios.post(
      'https://forms.zoho.in/api/v2/YOUR_FORM_LINK_NAME/records',
      {
        data: {
          Name: req.body.name,
          Phone_Number: req.body.phone,
          Country: req.body.country,
          Email: req.body.email,
          Medical_Reason: req.body.medicalReason,
        },
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Zoho submission failed' });
  }
});

export default router;
