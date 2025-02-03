# Event Planner

## Description

Event Planner is a robust application designed to simplify the process of organizing and managing events. Whether you’re planning a small gathering or a large conference, this tool helps you track attendees, schedule events, and send out reminders seamlessly.

## Features

- **Event Creation**: Easily create events with details like name, date, time, location and image.
- **Event Task Management**: Add, edit, and manage task information.
- **Invite Guests**: Invite memebers to event.
- **Notifications**: Send automated reminders and updates to tasks and guests invitation.

## Technology Stack

- **React Native & Expo**: For a dynamic and responsive user interface.
- **Supabase**: For efficient data storage and Authentication.
- **Google APIs**: For map details.
- **Tanstack Query**: For featching, caching data.
- **Nativewind**: For sleek and modern design.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prpradhan13/event-planner.git
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
     EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     EXPO_PUBLIC_MAP_API_KEY=your_google_map_api_key
     ```
5. Start the development server:
   ```bash
   npm run start
   ```

## Usage

1. **Sign Up/Login**: Create an account or log in with your credentials.
2. **Create an Event**: Navigate to the dashboard and click "Create Event" to add a new event.
3. **Manage Attendees**: Add attendees manually or upload a CSV file.
4. **Send Notifications**: Use the built-in notification system to remind attendees of upcoming events.
5. **View Analytics**: Access real-time analytics on your event’s performance.
