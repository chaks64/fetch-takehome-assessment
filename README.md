# Fetch Receipt Points Take Home Assignment

This project utilizes Docker and Redis to perform [Since using nodejs and all the dependencies are there in docker container].

## Prerequisites

- Docker: Follow the installation instructions based on your operating system:
  - [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/)
  - [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)
  - [Docker Engine for Linux](https://docs.docker.com/engine/install/)
  
## Getting Started

### 1. Clone the GitHub repository and build the docker image 

   - Clone the GitHub repository
   ```shell 
   git clone https://github.com/chaks64/fetch-takehome-assignment.git 
   ```
   
   - Change into the project directory
   ``` shell 
   cd fetch-takehome-assessment 
   ```
 
### 2. Run the Docker image as a container by executing the following command
   - Run the following command to remove the existing containers and pull the latest version of the Docker image:
  ```shell
  docker-compose down && docker-compose pull
  ```
   - Rebuild the Docker image using docker-compose build: 
  ```shell
  docker-compose build
  ```

   - Rebuild the Docker image using docker-compose build: ("-d" to run in detach mode)
  ```shell
  docker-compose up -d
  ```

## Running APIs

### API Endpoints

- Sample API to see server is running:
  - Path: http://localhost:3001/
  - Method: GET
  - Expected response: 
  ```json
  {"message":"Welcome"}
  ```
- Endpoint: Process Receipts:
    - Path: http://localhost:3001/receipts/process
    - Method: POST
    - Payload: Receipt JSON of receipt [Format mention in the example section]
    - Response: JSON containing an id for the receipt [Format mention in the example section]

- Endpoint: Calulate Points:
    - Path: http://localhost:3001/receipts/{id}/points [Example: http://localhost:3001/receipts/6938f5c0-2056-4e3f-8490-1a92931fb79a/points]
    - Method: GET
    - Response: A JSON object containing the number of points awarded

## Unit testing
### Testing unit functions
  ```shell
  npx mocha test/function.test.js
  ```

### Testing APIs
  ```shell
  npx mocha test/apis.test.js
  ```
 

## Examples
### Receipt Paylod:
#### Example 1 (valid):
```json
{
    "retailer": "Walgreens",
    "purchaseDate": "2022-01-02",
    "purchaseTime": "08:13",
    "total": "2.65",
    "items": [
        {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
        {"shortDescription": "Dasani", "price": "1.40"}
    ]
}
```

#### Example 2 (valid):
```json
{
    "retailer": "M&M Corner Market",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
        {"shortDescription": "Gatorade", "price": "2.25"},
        {"shortDescription": "Gatorade", "price": "2.25"},
        {"shortDescription": "Gatorade", "price": "2.25"},
        {"shortDescription": "Gatorade", "price": "2.25"}
  ],
  "total": "9.00"
}
```

#### Example 3 (invalid):
```json
{
    "retailer": "   Target store",
    "purchaseDate": "2022-03-20",
    "purchaseTime": "14:33",
    "items": [
        {"shortDescription": "Bread", "price": "3.25"},
        {"shortDescription": "Gatorade", "price": "1.25"}
  ],
  "total": "4.50"
}
```

### Receipt Respose
#### Successful Response: http-status code 200
```json
{
    "id": "02ccbf2d-8ab2-4d01-ab0d-9d70c2aad572"
}
```
#### Error Response: http-status code 400
```json
{
    "error": "The receipt is invalid"
}
```

### Points Response
#### For Example 1: http-status code 200
```json
{
    "points": 21
}
```

#### For Example 2: http-status code 200
```json
{
    "points": 109
}
```

#### For Invalid ID: http-status code 404
```json
{
    "error": "`No receipt found for the id`"
}
```

## Assumptions
- For testing the APIs I am assuming you might use postman or similar software
  - [Download Postman](https://www.postman.com/downloads/)

- Alternatively, APIs can also be executed using Swagger UI
  - http://localhost:3001/api-docs


## Using IDE instead of docker

### 1. Prerequisites

Before getting started, ensure that you have Node.js and npm installed on your machine. Follow the steps below to download and install them:

####  Node.js

- Node.js (version 16.20.1 or higher)
- npm package manager (version 8.19.4 or higher)

1. Visit the official Node.js website: [nodejs.org](https://nodejs.org).
2. Choose the version that corresponds to your operating system (Windows, macOS, or Linux).
3. Click on the download button to start the download.
4. Once the download is complete, run the installer and follow the installation instructions.
5. To verify that Node.js is installed, open a terminal or command prompt and type the following command:

   ```shell
   node --version
   ```
   ```shell
   npm --version
   ```

### 2. Clone the GitHub repository and build the docker image 

   - Clone the GitHub repository
       ```shell 
       git clone https://github.com/chaks64/fetch-takehome-assessment.git 
       ```
   
   - Change into the project directory
   
       ``` shell 
       cd fetch-receipt-assignment 
       ```

### 3. Install Dependencies and start the server
- To install dependencies
    ```shell
    npm install
    ```

- To start server/application
    ```sheel
    npm start
    ```
    
After these steps follow __Running APIs__ module to run the APIs
