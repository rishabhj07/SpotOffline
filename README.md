# SpotOffline

A Spotify Playlist to Youtube MP3 File Converter

## Table of Contents

- [About](#about)
- [Inspriation](#inspiration)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

This project is a full-stack JavaScript application designed to convert your Spotify songs into mp3 files for easy offline listening. It utilizes React and Bootstrap for frontend, and Node.js and Express.js for backend. The program utlizes Spotify's extensive API as well as [ytdl-core](https://www.npmjs.com/package/ytdl-core) to convert spotify tracks to mp3 files. 

## Inspiration

As someone who does not pay for Spotify Premium or have an unlimited data plan, my options for listening to songs on the go were very limited. Spotify-mp3 converters were available on the internet however they were either paid services or suspicious looking websites.

Since I could not find suitable alternatives to Spotify Premium online, I decided to program my own software to make downloading playlists easy.

## Installation

1. Clone te repository:

    ```sh
    git clone https://github.com/rishabhj07/SpotOffline.git
    ```

2. Navigate to the project root directory

    ```sh
    cd Spotoffline
    ```

From here, this project requires two seperate installations, one for the frontend and one for backend.

1. **Backend**

    Navigate to the [`backend`](https://github.com/rishabhj07/SpotOffline/tree/main/backend) directory:

    ```sh
    cd backend
    ```
    Install necessary packages:

    ```sh
    npm install
    ```

2. **Frontend**

    From the [`backend`](https://github.com/rishabhj07/SpotOffline/tree/main/backend) directory, nagivate to the [`frontend`](https://github.com/rishabhj07/SpotOffline/tree/main/frontend) directory:

    ```sh
    cd ../frontend
    ```

    Install necessary packages:

    ```sh
    npm install
    ```

> [!Important]
>
> [`backend`](https://github.com/rishabhj07/SpotOffline/tree/main/backend) and [`frontend`](https://github.com/rishabhj07/SpotOffline/tree/main/frontend) must be started seperately, requiring two seperate terminal instances.

## Usage

1. **Starting Backend Server**

    Navigate to the [`backend`](https://github.com/rishabhj07/SpotOffline/tree/main/backend) directory:

    ```sh
    cd backend
    ```
    
    Start the backend server:

    ```sh
    npm start
    ```

2. **Starting Frontend Server**

    In a new terminal instance, navigate to the [`frontend`](https://github.com/rishabhj07/SpotOffline/tree/main/frontend) directory:

    ```sh
    cd frontend
    ```

    Start the frontend server:

    ```sh
    npm start
    ```

## Contributing

Guidelines on how others can contribute to your project.

## License

Information about the license for your project.
