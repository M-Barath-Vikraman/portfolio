# Backend Setup Instructions

Follow these steps to set up and run the backend email server for your portfolio:

## Installation

1. Open a new terminal window
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Install the required dependencies:
   ```
   npm install
   ```

## Running the Server

1. Start the backend server:
   ```
   npm run dev
   ```
   Or if you're using PowerShell:
   ```
   npm run dev
   ```
   
2. The server will start on port 3001 and you should see a message: "Server running on port 3001"

## Testing

1. Keep your backend server running
2. In a separate terminal, start your frontend:
   ```
   npm run dev
   ```
3. Go to your contact form and submit a test message
4. You should receive:
   - A confirmation in the UI
   - An email sent to your Gmail account with the contact information
   - A confirmation email sent to the email address provided in the form

## Troubleshooting

If you encounter issues:

1. Check that your .env file in the server directory contains the correct Gmail credentials
2. Make sure your Gmail account has "Less secure app access" enabled or is properly set up for app passwords
3. Check the terminal output for any error messages
4. Verify that both frontend and backend servers are running simultaneously
