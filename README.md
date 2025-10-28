# Music Queue SaaS

## Overview
Music Queue SaaS is a Next.js application that allows users to add video links to a shared queue. Each link is processed so that only the audio plays when it reaches its turn in the queue. The app uses Prisma as the ORM and is designed to support multi-user SaaS functionality.

## Features
- Add video URLs to a shared playback queue  
- Automatic playback when the queued item reaches its turn  
- Real-time queue updates across all users  
- User authentication and account management  
- Subscription-based access for premium features  
- Admin panel for queue and user management  
- Persistent data storage using Prisma ORM

## Tech Stack
- **Framework:** Next.js (App Router)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Real-Time Updates:** WebSockets or Pusher
- **Deployment:** Vercel or Docker

