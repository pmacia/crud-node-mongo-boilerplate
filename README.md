
# Dockerized Node.js CRUD App

This project is a multi-container Docker application consisting of a Node.js REST API, a MongoDB database, and a web application.

This project also serves as a template or boilerplate, specifically designed to be an example or reference for students of the **Distributed Systems** course at the **University of Alicante**.


## Project Structure

- **api/**: Node.js REST API service.
- **web/**: Web application service.
- **docker-compose.yml**: Orchestration for all services.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd crud-node-mongo
    ```

2.  **Install dependencies (Optional):**
    If you want to run the project locally without Docker or need intellisense in your IDE:
    ```bash
    cd api
    npm install
    cd ../web
    # No dependencies for web as it's static, but good practice to check
    ```

3.  **Start the application:**
    ```bash
    docker-compose up --build
    ```

    This command will build the images and start the containers.

## Services

The application exposes the following services:

| Service | Description | Port |
| :--- | :--- | :--- |
| **api** | Node.js REST API for CRUD operations. | `3000` |
| **mongo** | MongoDB database. | `27017` |
| **web** | Web application interface. | `8080` |

## Development

- **Hot-Reloading**: The `api` service is configured with volume mounting (`./api:/app`) to enable hot-reloading. Changes made to files in the `api` directory will automatically restart the server.
- **Data Persistence**: MongoDB data is persisted using a named volume `mongo_data`.

## Container Management

### Exploring MongoDB
To inspect the database contents directly:

1.  **Access the MongoDB container:**
    ```bash
    docker exec -it mongo_db mongosh
    ```
    *(Note: Use `mongo` instead of `mongosh` if using an older image)*

2.  **Switch to the database:**
    ```javascript
    use crud_db
    ```

3.  **Query items:**
    ```javascript
    db.items.find()
    ```

4.  **Exit:**
    ```javascript
    exit
    ```

### Viewing Logs
To see the logs for the services:

- **All services:**
    ```bash
    docker-compose logs -f
    ```

- **Specific service (e.g., api):**
    ```bash
    docker-compose logs -f api
    ```

## API Endpoints

The API is available at `http://localhost:3000/api`.

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/items` | Retrieve all items. | N/A |
| `GET` | `/items/:id` | Retrieve a single item by ID. | N/A |
| `POST` | `/items` | Create a new item. | `{ "name": "Item Name" }` |
| `PUT` | `/items/:id` | Update an item by ID. | `{ "name": "New Name" }` |
| `DELETE` | `/items/:id` | Delete an item by ID. | N/A |

## Usage

### Web Application

1.  Open your browser and navigate to `http://localhost:8080`.
2.  You will see a simple interface to manage items.
3.  **Add Item**: Type a name in the input field and click "Add".
4.  **Delete Item**: Click the "Delete" button next to an item to remove it.

### API Interaction

You can interact directly with the API using tools like `curl` or Postman.

**Base URL**: `http://localhost:3000/api`

#### List Items
Get all items from the database.

```bash
curl http://localhost:3000/api/items
```

#### Create Item
Add a new item to the database.

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item"}'
```

#### Delete Item
Delete an item by its ID. Replace `<id>` with the actual item ID.

```bash
curl -X DELETE http://localhost:3000/api/items/<id>
```

## Autores ✒️

Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios.

* **Paco Maciá** - *Trabajo Inicial* - [pmacia](https://github.com/pmacia)