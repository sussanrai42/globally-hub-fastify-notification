## About Project
This project is a Fastify-based Node.js service that listens for incoming notifications sent from the Laravel Notification API via RabbitMQ. It consumes messages from the queue and processes them as needed (e.g., logging, storing, forwarding, etc.).

### Technologies Used
- Runtime: Node.js
- Framework: Fastify
- Message Broker: RabbitMQ

## Project Features
- Connects to a RabbitMQ queue.
- Listens for incoming notification messages.
- Processes notifications (e.g., console log or future enhancements like storing/sending).

## Requirements
- Node.js (v18 or above recommended)
- RabbitMQ instance (local or Docker-based)

## Getting Started with Docker
- With Docker
    - Goto the main project directory
    - if not docker network has been created, create a network named `golballyhub`
    - Copy .env.example to .env in project directory
    - Run command to start docker: docker compose up
    - Once all services are running, access the application at: [goto](http://localhost:3000)
    - Goto the docker container through command: docker exec -it globallyhubfastify-app bash
    - After inside a container, run commnad: prisma migrate deploy

## How It Works
- Laravel app publishes a message to the notifications queue in RabbitMQ.
- Fastify app subscribes to this queue.
- Each incoming message is handled and processed by the Fastify service.

## Testing the Integration
- After setting up both Laravel and Fastify apps:
- Use the Laravel API (see its Postman collection) to send a notification.
- The Fastify app should receive and process the message in real time (check your terminal logs).

## Postman Collection
- You can find the Postman collection in the root directory of the project: fastify-notification-api.postman_collection.json
- Use this file to test the available API endpoints.

## Note
- Regarding the docker environment, you need to create network named `golballyhub` so resources like mysql, redis, rabbitmq will be shared via same network.
- Without docker container running in the laravel notification api service project, this node js project cannot be run. So first run docker in larvaravel notification api service and then come to this project.
