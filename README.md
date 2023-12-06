# Cavli Backend

Backend code base for uploading file and sending file data in json format

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/anandukch/cavli-backend
   ```

2. **Install Dependencies:**

   ```bash
   cd cavli-backend
   npm install
   ```

3. **Run the App Using docker:**

   ```bash
   docker compose up
   ```

4. **Run the App Using script:**

   ```bash
   npm run dev
   ```

## Tech Stack

* **`Express`**
* **`Mongodb`**
* **`AWS S3`**

## Workflow

1. Entry of aws credentials during start up ([/login](https://cavli-api.onrender.com/api-docs/#/default/post_login))
2. Upon the entry a json token will be created
3. Later using the **token**, the verified user can
   1. Upload a file ([/upload](https://cavli-api.onrender.com/api-docs/#/default/post_upload))
   2. View all files uploaded ([/files](https://cavli-api.onrender.com/api-docs/#/default/get_files))
   3. View a single file data ([/files/{fileName}](https://cavli-api.onrender.com/api-docs/#/default/get_files__fileName_))

## For api Documentation

[https://cavli-api.onrender.com/api-docs/](https://cavli-api.onrender.com/api-docs/)

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature`).
3. Commit changes (`git commit -am 'Add feature'`).
4. Push the branch (`git push origin feature`).
5. Create a pull request.
