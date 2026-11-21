import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            1. Introduction
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            PropertyFlow is a real-estate dealer platform that allows dealers to connect their WhatsApp Business accounts through Meta to process WhatsApp buyer enquiries. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            2. Information We Collect
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            When you use PropertyFlow, we may process the following types of information:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1"><strong>Dealer Information:</strong> Business details and contact information provided during registration.</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Buyer Information:</strong> Phone numbers and profile names of buyers interacting via WhatsApp.</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Conversations & Data:</strong> Messages, property requirements, and lead information generated during WhatsApp interactions.</Typography>
            </li>
            <li>
              <Typography variant="body1"><strong>Meta Integration Data:</strong> Tokens and metadata required to connect and maintain the WhatsApp Business integration via Meta.</Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            3. How We Use Your Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We use the collected information exclusively to provide and improve the PropertyFlow service. Specifically, we use it to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Respond to buyer enquiries automatically on behalf of the dealer.</Typography>
            </li>
            <li>
              <Typography variant="body1">Match buyer property requirements against the dealer&apos;s inventory.</Typography>
            </li>
            <li>
              <Typography variant="body1">Manage leads and display analytics in the dealer dashboard.</Typography>
            </li>
            <li>
              <Typography variant="body1">Maintain the secure integration with the Meta WhatsApp Cloud API.</Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            4. Data Sharing and Protection
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We are committed to protecting your data. <strong>We do not sell personal information to third parties.</strong> Data is shared only with Meta as required to facilitate the WhatsApp messaging service, and with cloud infrastructure providers essential to operating the platform.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            5. User Rights and Data Deletion
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You have the right to request access to, correction of, or deletion of your personal data. If you wish to revoke access or request data deletion, please contact us. Note that revoking Meta access or deleting your account will permanently disconnect the WhatsApp integration and remove associated leads.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            6. Contact Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact the operator at:
            <br /><br />
            <strong>Email:</strong> [REPLACE_WITH_SUPPORT_EMAIL]
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
