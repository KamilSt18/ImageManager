
# ImageManager

Backend application - REST API to retrieve images and save to database. Implements query queuing.
## 💻 Built with

Technologies used in the project:

*   Typescript 5.0.2
*   Express 4.18.2
*   Mongoose 7.0.3
*   Redis 4.6.5
*   Axios 1.3.4
*   bull 4.10.4
## Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)
- Mongodb database (e.g. Redis Labs)
- Redis database (e.g. Atlas)
## Installation

To install the project and its dependencies, clone the repository and run the following command in the project directory:

```bash
  npm install
```
    
## Usage

The `.env.example` file in this project contains an example of the environment variables that should be defined in a `.env` file. Replace the values of each variable with your own values.


To start the server, run the following command:

```bash
  npm start
```

The server will start listening on port 8000 by default.
## API Reference

#### Get all images

```http
GET /images
```

Example response

```JSON
[
  {
    "_id": "642410cd4f223f847ed40683",
    "sourceUrl": "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
    "status": "downloaded",
    "dateAdded": "2023-03-29T10:19:57.207Z",
    "__v": 0,
    "dateDownloaded": "2023-03-29T10:19:57.929Z",
    "url": "http://localhost:8000/images/642410cd4f223f847ed40683.jpeg"
  }
]
```

#### Get image

```http
GET /images/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of image to fetch |

Example response

```JSON
{
  "sourceUrl": "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
  "dateAdded": "2023-03-29T10:19:57.207Z",
  "status": "downloaded",
  "dateDownloaded": "2023-03-29T10:19:57.929Z",
  "url": "http://localhost:8000/images/642410cd4f223f847ed40683.jpeg"
}
```

#### Post image
The request body should include a JSON object with the **required** `sourceUrl` (`string`) field.

```http
POST /images
{
  "sourceUrl": "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"
}
```




Example response

```JSON
{
  "message": "http://localhost:8000/images/642410cd4f223f847ed40683",
  "status": "success",
  "code": "201 Created"
}
```

#### Delete image

```http
DELETE /images/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of image to delete |

Example response

```JSON
{
  "message": "The image with id 642410cd4f223f847ed40683 has been removed!",
  "status": "success",
  "code": "200 OK"
}
```
## Feedback

If you have any feedback, please reach out to us at kamilst18@gmail.com


## License

[MIT](https://choosealicense.com/licenses/mit/)

