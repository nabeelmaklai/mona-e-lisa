# mona-e-lisa

## About the app
> The digital art gallery platform provides a curated collection of digital artworks for users to explore and enjoy. To access the full features of the platform, users are required to authenticate through a custom OAuth. This authentication process grants them the ability to curate their own personalized galleries. Visitors who haven't authenticated are still able to browse public displayed art work. Authenticated users are able to display their art, create collections, add descriptions for them and comment of peopele's art. 

## Team

The building of the site will be a team effort. The team was composed of:

- [Jassim](https://github.com/9Jassim)
- [Shaikha](https://github.com/Shaikha277)
- [Nabeel](https://github.com/nabeelmaklai)



## Development Outline

> The site will be developed using the Express JS framework for the backend and React for the frontend. The user authentication will be inbuilt and no third part authentication such as Google OAuth. Third party tools such as password digest will be used to hash passwords and the React hooks will be used to create the frontend funcationality.



## Coding the App


The digital art gallery application will use the ExpressJS framework in alongside MongoDB, with Mongoose facilitating database interactions within the ExpressJS environment. 
To ensure database consistency, schemas will be defined for artworks, galleries, and users, allowing efficient querying operations. Upon user authentication, a user object is instantiated, capturing essential details such as their profile picture, username, and email address.

As users interact with the platform, adding artworks to their galleries and collections, corresponding artwork objects are generated and stored in the database. To prevent duplication, each artwork is tagged with a unique identifier. Galleries are represented as referenced object IDs within the user object, while the gallery object contains referenced object IDs of associated artworks.

These objects will be seamlessly queried and rendered using React amd the ExpressJS framework, providing users with an immersive digital art viewing experience.

## :computer: Technologies Used

- ![HTML badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![JS badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- ![Express badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=express&logoColor=F7DF1E)
