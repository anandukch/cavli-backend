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

1. Entry of aws credentials during start up
2. Upon the entry a json token will be created
3. Later usign the json token the verified user can add , view and upload the file

## For api Documentation

[https://cavli-api.onrender.com/api-docs/](https://cavli-api.onrender.com/api-docs/)

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature`).
3. Commit changes (`git commit -am 'Add feature'`).
4. Push the branch (`git push origin feature`).
5. Create a pull request.
