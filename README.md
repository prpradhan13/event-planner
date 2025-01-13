# Event Planner

## Description

Event Planner is a robust application designed to simplify the process of organizing and managing events. Whether you’re planning a small gathering or a large conference, this tool helps you track attendees, schedule events, and send out reminders seamlessly.

## Features

- **Event Creation**: Easily create events with details like name, date, time, and location.
- **Attendee Management**: Add, edit, and manage attendee information.
- **Notifications**: Send automated reminders and updates to attendees.
- **Customizable Themes**: Personalize event pages to match your branding or preferences.
- **Analytics Dashboard**: Gain insights into RSVP status, attendance, and engagement.

## Technology Stack

- **Frontend**: React.js for a dynamic and responsive user interface.
- **Backend**: Node.js with Express for server-side functionality.
- **Database**: MongoDB for efficient data storage and retrieval.
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication.
- **Styling**: Tailwind CSS for sleek and modern design.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/event-planner.git
   ```
2. Navigate to the project directory:
   ```bash
   cd event-planner
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Sign Up/Login**: Create an account or log in with your credentials.
2. **Create an Event**: Navigate to the dashboard and click "Create Event" to add a new event.
3. **Manage Attendees**: Add attendees manually or upload a CSV file.
4. **Send Notifications**: Use the built-in notification system to remind attendees of upcoming events.
5. **View Analytics**: Access real-time analytics on your event’s performance.
