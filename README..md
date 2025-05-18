# Multi-Container App with Host Volume Mount

This project demonstrates how to mount a host volume to Docker services, specifically for persisting PostgreSQL data outside of Docker's internal volumes. This approach is useful for backup, recovery, and data persistence in case of container or VM failures.

## Project Structure

- `server/`: Node.js Express API for managing books in a PostgreSQL database.
- `pgdata/`: Host-mounted directory for PostgreSQL data files.
- `docker-compose.yml`: Docker Compose configuration for services.
- `app-logs/`: Directory for application logs.

## How to Use

1. **Create the `pgdata` Folder**

   In the root of the project, create a folder named `pgdata`:

   ```sh
   mkdir pgdata
   ```

2. **Start the Services**

   Build and run the services using Docker Compose:

   ```sh
   docker compose up --build -d
   ```

   This will start the PostgreSQL and API server containers, mounting the `pgdata` folder from your host to the PostgreSQL container.

3. **Verify Data Persistence**

   - Add some data using the API.
   - To test persistence:
     1. **Backup** the `pgdata` folder.
     2. **Delete** the `pgdata` folder from the root.
     3. **Stop and remove** the containers:
        ```sh
        docker compose down
        ```
     4. **Restore** the `pgdata` folder from your backup to the root.
     5. **Recreate** the containers:
        ```sh
        docker compose up --build -d
        ```
     6. Your data will still be available, demonstrating that the data is stored on the host, not inside the Docker container.

## What You Learn

- How to mount a host volume to a Docker container.
- How to take backups of Docker volumes.
- How to restore data in case of container or VM failure.
- Practical use cases for volume mounts in Docker for data persistence and recovery.

---

**Tip:** Always backup your `pgdata` folder regularly to prevent data loss.
