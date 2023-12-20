# SpotOffline

A Spotify Playlist to Youtube MP3 File Converter

## Table of Contents

- [About](#about)
- [Inspriation](#inspiration)
- [UML](#uml)
- [Media](#media)
- [Installation](#installation)
- [Usage](#usage)
- [Future Additions](#additions)
- [Contributions](#contributions)
- [License](#license)

## About

This project is a full-stack JavaScript application designed to convert your Spotify songs into mp3 files for easy offline listening. It utilizes React and Bootstrap for frontend, and Node.js and Express.js for backend. The program utlizes Spotify's extensive API as well as [ytdl-core](https://www.npmjs.com/package/ytdl-core) to convert spotify tracks to mp3 files. 

## Inspiration

As someone who does not pay for Spotify Premium or have an unlimited data plan, my options for listening to songs on the go were very limited. Spotify-mp3 converters were available on the internet however they were either paid services or suspicious looking websites.

Since I could not find suitable alternatives to Spotify Premium online, I decided to program my own software to make downloading playlists easy.

## UML

<blockquote class="imgur-embed-pub" lang="en" data-id="a/ZUEfQGS"  ><a href="//imgur.com/a/ZUEfQGS">UML Diagram</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

## Media

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

    Set up your environment variables:
    1. Find the `.env.example` file.
    2. Copy the contents of `.env.example`.
    3. Create a new file in the same directory called `.env`.
    4. Paste the contents into the `.env` file.
    5. Replace the placeholder values with your actual data. You will need to create a [Spotify developer account](https://developer.spotify.com/documentation/web-api) and create a project to obtain a `client_id` and `client_secret`

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
> [`backend`](https://github.com/rishabhj07/SpotOffline/tree/main/backend) and [`frontend`](https://github.com/rishabhj07/SpotOffline/tree/main/frontend) must be started seperately, requiring two seperate terminal instances. See [`usage`](#usage) for more details.

## Usage

After installing necessary packages, please follow the instructions below to start using the application:

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
Now you can interact with the application using a browser by opening [http://localhost:3000](http://localhost:3000). If you need to stop the servers, you can do so by pressing `Ctrl+C` in the respective terminal instances.

## Additions

- Hosting using AWS
- Ability to convert Youtube links to mp3 files
- Create a better Youtube downloader

## Contributions

### How to Contribute
1. Fork the repository.
2. Star the repository.
2. Create a new branch for your contribution.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

### Areas for Contribution
- Bug fixes
- Feature enhancements
- Documentation improvements
- Code optimization
- UX/UI enhancements

### Get in Touch
If you have questions or need further assistance, feel free to open an issue or contact me on Discord `@reziny`.

## License

This project is licensed under the MIT License. Check the [LICENSE](LICENSE) file for more details.
