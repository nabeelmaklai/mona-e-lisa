# mona-e-lisa
## About the app
The digital art gallery platform provides a curated collection of digital artworks for users to explore and enjoy. To access the full features of the platform, users are required to authenticate through a custom OAuth. This authentication process grants them the ability to curate their own personalized galleries. Visitors who haven't authenticated are still able to browse public displayed art work. Authenticated users are able to display their art, create collections, add descriptions for them and comment of peopele's art.

## Team
The building of the site was a team effort. The team was composed of:

- [Jassim](https://github.com/9Jassim)
- [Shaikha](https://github.com/Shaikha277)
- [Nabeel](https://github.com/nabeelmaklai)

## Development Outline
The site was developed using the Express JS framework for the backend and React for the frontend. The user authentication will be inbuilt and no third part authentication such as Google OAuth. Third party tools such as password digest will be used to hash passwords and the React hooks will be used to create the frontend funcationality.

## Coding the App
The digital art gallery application will use the ExpressJS framework in alongside MongoDB, with Mongoose facilitating database interactions within the ExpressJS. Schemas were created for artworks, collections, and users, allowing querying operations. Once a user is authentication, a user object is instantiated, capturing essential details such as their bio, username, and email address.

As users interact with the platform, adding artworks to their galleries and collections, corresponding artwork objects are generated and stored in the database. To prevent duplication, each artwork is tagged with a unique identifier. Collections are represented as referenced object IDs within the user object, while the collection objects contains referenced object IDs of associated artworks.

These objects are queried and rendered using React and the ExpressJS framework, providing users with an immersive digital art viewing experience. Additional functionality of the site includes the ability to follow users, comment on art work, like a piece of artwork and reply to comments on art work. The additional functionalities utilize schemas and referenced object IDs to function. For example, when a user follows another user, the obejct ID of the follwer is appended to the array of followers in the user's schema. 

> ![Alt text](https://github.com/nabeelmaklai/mona-e-lisa/blob/main/images/mona-e-lisa%20code.png)


## Deployed version
The deployed [version](https://monaelisa.surge.sh/) of the app has a landing page displaying all the art uploaded by other users. unregistered and not logged in users can still view the art, the comments and replies associated. 
> ![Alt text](https://github.com/nabeelmaklai/mona-e-lisa/blob/main/images/view-art.png)

When users register and sign in, the landing page is teh same except this time, on the righ hand side, the artists followed by the user will be displayed.

> ![Alt text](https://github.com/nabeelmaklai/mona-e-lisa/blob/main/images/signed-in.png)

Logged in users can view each piece of art individually along with the associated comments and replies. under the piece of art, users can like and add the image to their collection which can be created in their profile landing page.

> ![Alt text](https://github.com/nabeelmaklai/mona-e-lisa/blob/main/images/profile-page.png)



 
## :computer: Technologies Used

- ![HTML badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![JS badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- ![Express badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=express&logoColor=F7DF1E)
