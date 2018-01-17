# Conference cloud app
---------
Author: Pawel Paszki

## What is it?

This is RESTful api, which is used by client conference appication available here:

[https://psdev.us.evals.redhatmobile.com/#projects/ddevzfijp2dknkdfakslujuv/apps/ddevzfonet2qvcx5atoti6gn/details](https://psdev.us.evals.redhatmobile.com/#projects/ddevzfijp2dknkdfakslujuv/apps/ddevzfonet2qvcx5atoti6gn/details)

# API Documentation

This project provides RESTful API for conference application

# **List Users**

Returns a list of Users

- **URL**

  `/api/users`

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "name": "Jerry Snider",
      "_id" "58e35272a2abff071ec8595e",<br>
      "name": "Jerry Snider",<br>
      "email": "jsnider@gmail.com",<br>
      "phone_number": 865849345<br>
    },<br>
    {<br>
      "name": "Karl Whitney",<br>
      "_id": "58e3529ca2abff071ec8595f",<br>
      "email": "kwhitney@gmail.com",<br>
      "phone_number": 879384351<br>
    },<br>
    {<br>
      "name": "Hart Robbins",<br>
      "_id": "58e352bea2abff071ec85960",<br>
      "email": "hrobbins@gmail.com",<br>
      "phone_number": 875693168<br>
    }<br>

- **Error Response:**

- **Code:** 500<br>

  {<br>
    "Could not create user. Error: " + err <br>
  }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/").map((response: Response) => {
      return <any[]>response.json()
  }).
  ```

# **Show User**
--------------------------------------------------------------------------------

Returns JSON data about a single user.

- **URL**

  `/api/users/:id`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Sample Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "_id": "58e35272a2abff071ec8595e",<br>
      "password": "Password1",<br>
      "username": "jsnider",<br>
      "phone_number": 865849345,<br>
      "email": "jsnider@gmail.com",<br>
      "dob": "1972-04-17T00:00:00.000Z",<br>
      "name": "Jerry Snider",<br>
      "__v": 1,<br>
      "messages": [<br>
        {<br>
          "_id": "58e4c3f0fe241c090ac653c2",<br>
          "receiver_id": "58e35272a2abff071ec8595e",<br>
          "sender_id": "58e3ed84ed8d080571bb59fd",<br>
          "content": "hello",<br>
          "read": false,<br>
          "date": "2017-04-05T10:16:16.988Z"<br>
        }<br>
      ]<br>
    }<br>

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR<br>
    **Content:**

    { <br>
      "error": "Error loading user" <br>
    }<br>

  - **Code:** 404<br>
    **Content:**

    { <br>
      "error": "User not found" <br>
    }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58e35272a2abff071ec8595e" + ).map((response: Response) => {
      return <any>response.json()
  });
  ```

# **Create a User**

Creates single user

- **URL**

  `/api/users/signup`

- **Method:**

  `POST`

- **URL Params**

  None

- **Sample Data Params**

  {<br>
    "name": "Beasley Parker",<br>
    "username": "bparker",<br>
    "password": "Password1",<br>
    "email": "bparker@gmail.com",<br>
    "phone": 868292999,<br>
    "dob": "1975-Mar-09"<br>
  }<br>

- **Success Response:**

  - **Code:** 201<br>
    **Content:**

    {<br>
      "__v": 0,<br>
      "password": "Password1",<br>
      "username": "bparker",<br>
      "email": "bparker@gmail.com",<br>
      "dob": "1975-03-09T00:00:00.000Z",<br>
      "name": "Beasley Parker",<br>
      "_id": "58ee4f2b0276de0b95e604cb",<br>
      "messages": []<br>
    }<br>

- **Error Response:**

  - **Code:** 500<br>
    **Content:**

  { <br>
    "error": "Could not create user. Error: " + err <br>
  }<br>

- **Sample Call:**

  ```
  http.post("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/signup", JSON.stringify(signUpInfo), { 'Content-Type': 'application/json' })
      .map((response: Response) => {
          return response.json();
        }
  });
  ```

# **Update a user**

Updates single user's details, if id match found

- **URL**

  `/api/users/:id`

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[string]`

  - **Sample Data Params**

  {<br>
    "name": "Beasley Parker",<br>
    "username": "bparker",<br>
    "password": "Password1",<br>
    "email": "bparker@gmail.com",<br>
    "phone": 868292999,<br>
    "dob": "1975-Mar-09"<br>
  }<br>

  - **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "__v": 0,<br>
      "password": "Password1",<br>
      "username": "bparker",<br>
      "email": "bparker@gmail.com",<br>
      "dob": "1975-03-09T00:00:00.000Z",<br>
      "name": "Beasley Parker",<br>
      "_id": "58ee4f2b0276de0b95e604cb",<br>
      "messages": []<br>
    }<br>

- **Error Response:**

- **Code:** 500<br>
  **Content:**

  { <br>
    "error": "Could not update user" <br>
  }<br>

  - **Code:** 404<br>
    **Content:**

  { <br>
    "error": "Could not find user. "<br>
   }<br>

- **Sample Call:**

  ```
  http.put("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58ee4f2b0276de0b95e604cb", JSON.stringify(this.currentUser), { 'Content-Type': 'application/json' });
  ```

# **Remove a user**

Removes a single user, if id match found

- **URL**

  `/api/users/delete/:id`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    { <br>
      "User removed"<br>
    } <br>

- **Error Response:**

  - **Code:** 500<br>
    **Content:**

  { <br>
    "error": "Cannot remove a user" <br>
  }<br>

  - **Code:** 404<br>
    **Content:**

  { <br>
    "error": "Could not find user"<br>
   }<br>

  - **Code:** 403<br>
    **Content:**

  { <br>
    "error": "Could not delete user." <br>
  }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58ee4f2b0276de0b95e604cb");
  ```

# **Authenticate a User**

Authenticates single user

- **URL**

  `/api/authenticate`

- **Method:**

  `POST`

- **URL Params**

  None

- **Sample Data Params**

  {<br>
    "email": "mdelgado@gmail.com",<br>
    "password": "Password1"<br>
  }<br>

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "__v": 24,<br>
      "_id": "58d1b268e399d35a62a839d3",<br>
      "dob": "1984-08-01T00:00:00.000Z",<br>
      "email": "mdelgado@gmail.com",<br>
      "name": "Manuela Delgado",<br>
      "password": "Password1",<br>
      "phone_number": 859865412,<br>
      "username": "mdelgado",<br>
      "messages": []<br>
    }<br>

- **Error Response:**

  - **Code:** 500<br>
    **Content:**

  { <br>
    "error": "Invalid credentials" <br>
  }<br>

  - **Code:** 401<br>
    **Content:**

  { <br>
    "error": "Incorrect password" <br>
  }<br>

- **Sample Call:**

  ```j
  http.post("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/signup", JSON.stringify(loginInfo), { 'Content-Type': 'application/json' })
      .map((response: Response) => {
          return response.json();
        }
  });
  ```

# **Bookmark event**

Bookmarks single event in a conference (adds one attendee to the list of attendees)

- **URL**

  `/api/users/:user_id/conferences/:id'`

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[string]` `user_id=[string]`

  - **Data Params**

  **Required:**

  {<br>
     `event_id=[Number]`<br>
     `isBookmarked=[Boolean]`<br>
     `name=[string]`<br>
  }<br>

  - **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "message" :"bookmark updated"<br>
    }<br>

- **Error Response:**

- **Code:** 500<br>
  **Content:**

  { <br>
    "error": err <br>
  }<br>

- **Sample Call:**

  ```
  http.put("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/" + user_id + "/conferences/" + this.conference._id, bookmarkInfo, { 'Content-Type': 'application/json' });
  ```

# **List Conferences**

Returns a list of Conferences

- **URL**

  `/api/conferences`

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "_id": "58e4d1425bfc465abb9f790e",<br>
      "city": "Orlando",<br>
      "country": "USA",<br>
      "info": "This year’s premier conference on digital business transformation is right here, the Citrix Synergy 2017 conference. <br>
      This is all about networking with your peers and industry experts, learning with Expert hosted TED-talk sessions and a two-day Instructor-led Learning Labs,
      <br>and most importantly, it’s about discovery, with world class keynotes and innovation super sessions.
      <br>Attend this conference to see how Citrix is redefining the future of business.",<br>
      "name": "Citrix Synergy 2017",<br>
      "state": "FL",<br>
      "sessions": [<br>
        {<br>
          "date": "03-jul-2017",<br>
          "events": [<br>
            {<br>
              "id": 1,<br>
              "start": "03-jul-2017 09:00:00",<br>
              "end": "03-jul-2017 10:00:00",<br>
              "title": "Lorem ipsum ",<br>
              "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet elit magna, eget faucibus dui vehicula vitae. ",<br>
              "attendees": [<br>
                {<br>
                  "_id": "58e63fd45bfc465abb9f7911",<br>
                  "user_id": "58d1b268e399d35a62a839d3",<br>
                  "name": "Manuela Delgado"<br>
                },<br>
                {<br>
                  "_id": "58edf5c873e9c072dfa0c0fb",<br>
                  "user_id": "58d1b200e399d35a62a839cf",<br>
                  "name": "Fischer Underwood"<br>
                }<br>
              ]<br>
            },<br>
            {<br>
              "id": 2,<br>
              "start": "03-jul-2017 10:00:00",<br>
              "end": "03-jul-2017 11:00:00",<br>
              "title": "Pellentesque leo ligula",<br>
              "info": "Pellentesque leo ligula, vulputate eget placerat vitae, hendrerit sed nisl. Proin luctus velit elit, egestas molestie neque pulvinar quis.",<br>
              "attendees": [<br>
                {<br>
                  "_id": "58eba3c35bfc465abb9f7912",<br>
                  "user_id": "58d1b268e399d35a62a839d3",<br>
                  "name": "Manuela Delgado"<br>
                }<br>
              ]<br>
            }<br>
          ]<br>
        },<br>
        {<br>
          "date": "04-jul-2017",<br>
          "events": [<br>
            {<br>
              "id": 3,<br>
              "start": "04-jul-2017 09:00:00",<br>
              "end": "04-jul-2017 09:30:00",<br>
              "title": "Orci varius natoque",<br>
              "info": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tincidunt sodales turpis, nec tincidunt neque finibus vitae. ",<br>
              "attendees": [<br>
                {<br>
                  "_id": "58e4d6e35bfc465abb9f790f",<br>
                  "user_id": "58d1b268e399d35a62a839d3",<br>
                  "name": "Manuela Delgado"<br>
                }<br>
              ]<br>
            },<br>
            {<br>
              "id": 4,<br>
              "start": "04-jul-2017 09:30:00",<br>
              "end": "04-jul-2017 10:00:00",<br>
              "title": "Aliquam eget felis",<br>
              "info": "Phasellus non neque dictum, sagittis turpis at, dictum augue. Quisque pretium feugiat mauris, sit amet pulvinar velit ultricies sed.",<br>
              "attendees": []<br>
            }<br>
          ]<br>
        }<br>
      ]<br>
    }<br>

- **Error Response:**

- **Code:** 500 <br>

  {<br>
    "err: " + err<br>
  }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/conferences/").map((response: Response) => {
      return <any[]>response.json()
  }).
  ```

#  **Show Conference**
--------------------------------------------------------------------------------

Returns JSON data about a single user.

- **URL**

  `/api/conferences/:id`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "conferences": [<br>
        {<br>
          "_id": "58e4d1425bfc465abb9f790e",<br>
          "__v": 2,<br>
          "city": "Orlando",<br>
          "country": "USA",<br>
          "info": "This year’s premier conference on digital business transformation is right here, the Citrix Synergy 2017 conference. <br>
          This is all about networking with your peers and industry experts, learning with Expert hosted TED-talk sessions and a two-day Instructor-led Learning Labs,
          <br>and most importantly, it’s about discovery, with world class keynotes and innovation super sessions.
          <br>Attend this conference to see how Citrix is redefining the future of business.",<br>
          "name": "Citrix Synergy 2017",<br>
          "state": "FL",<br>
          "sessions": [<br>
            {<br>
              "date": "03-jul-2017",<br>
              "events": [<br>
                {<br>
                  "id": 1,<br>
                  "start": "03-jul-2017 09:00:00",<br>
                  "end": "03-jul-2017 10:00:00",<br>
                  "title": "Lorem ipsum ",<br>
                  "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet elit magna, eget faucibus dui vehicula vitae. ",<br>
                  "attendees": [<br>
                    {<br>
                      "_id": "58e63fd45bfc465abb9f7911",<br>
                      "user_id": "58d1b268e399d35a62a839d3",<br>
                      "name": "Manuela Delgado"<br>
                    },<br>
                    {<br>
                      "_id": "58edf5c873e9c072dfa0c0fb",<br>
                      "user_id": "58d1b200e399d35a62a839cf",<br>
                      "name": "Fischer Underwood"<br>
                    }<br>
                  ]<br>
                },<br>
                {<br>
                  "id": 2,<br>
                  "start": "03-jul-2017 10:00:00",<br>
                  "end": "03-jul-2017 11:00:00",<br>
                  "title": "Pellentesque leo ligula",<br>
                  "info": "Pellentesque leo ligula, vulputate eget placerat vitae, hendrerit sed nisl. Proin luctus velit elit, egestas molestie neque pulvinar quis.",<br>
                  "attendees": [<br>
                    {<br>
                      "_id": "58eba3c35bfc465abb9f7912",<br>
                      "user_id": "58d1b268e399d35a62a839d3",<br>
                      "name": "Manuela Delgado"<br>
                    }<br>
                  ]<br>
                }<br>
              ]<br>
            },<br>
            {<br>
              "date": "04-jul-2017",<br>
              "events": [<br>
                {<br>
                  "id": 3,<br>
                  "start": "04-jul-2017 09:00:00",<br>
                  "end": "04-jul-2017 09:30:00",<br>
                  "title": "Orci varius natoque",<br>
                  "info": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tincidunt sodales turpis, nec tincidunt neque finibus vitae. ",<br>
                  "attendees": [<br>
                    {<br>
                      "_id": "58e4d6e35bfc465abb9f790f",<br>
                      "user_id": "58d1b268e399d35a62a839d3",<br>
                      "name": "Manuela Delgado"<br>
                    }<br>
                  ]<br>
                },<br>
                {<br>
                  "id": 4,<br>
                  "start": "04-jul-2017 09:30:00",<br>
                  "end": "04-jul-2017 10:00:00",<br>
                  "title": "Aliquam eget felis",<br>
                  "info": "Phasellus non neque dictum, sagittis turpis at, dictum augue. Quisque pretium feugiat mauris, sit amet pulvinar velit ultricies sed.",<br>
                  "attendees": []<br>
                }<br>
              ]<br>
            }<br>
          ]<br>
        }<br>
      ]<br>
    }<br>

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR<br>
    **Content:**

    { <br>
      "error": "Error loading conference"<br>
     }<br>

  - **Code:** 404<br>
    **Content:**

    { <br>
      "error": "Conference not found" <br>
    }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/conferences/58e4d1425bfc465abb9f790e" + ).map((response: Response) => {
      return <any>response.json()
  });
  ```

# **Create a Conference**

  Creates single conference

- **URL**

  `/api/conferences`

- **Method:**

  `POST`

- **URL Params**

  None

- **Sample Data Params**

{<br>
  "_id": "58e4d1425bfc465abb9f790e",<br>
  "city": "Orlando",<br>
  "country": "USA",<br>
  "info": "This year’s premier conference on digital business transformation is right here, the Citrix Synergy 2017 conference. <br>
  This is all about networking with your peers and industry experts, learning with Expert hosted TED-talk sessions and a two-day Instructor-led Learning Labs,
  <br>and most importantly, it’s about discovery, with world class keynotes and innovation super sessions.
  <br>Attend this conference to see how Citrix is redefining the future of business.",<br>
  "name": "Citrix Synergy 2017",<br>
  "state": "FL",<br>
  "sessions": [<br>
    {<br>
      "date": "03-jul-2017",<br>
      "events": [<br>
        {<br>
          "id": 1,<br>
          "start": "03-jul-2017 09:00:00",<br>
          "end": "03-jul-2017 10:00:00",<br>
          "title": "Lorem ipsum ",<br>
          "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet elit magna, eget faucibus dui vehicula vitae. ",<br>
          "attendees": [<br>
            {<br>
              "_id": "58e63fd45bfc465abb9f7911",<br>
              "user_id": "58d1b268e399d35a62a839d3",<br>
              "name": "Manuela Delgado"<br>
            },<br>
            {<br>
              "_id": "58edf5c873e9c072dfa0c0fb",<br>
              "user_id": "58d1b200e399d35a62a839cf",<br>
              "name": "Fischer Underwood"<br>
            }<br>
          ]<br>
        },<br>
        {<br>
          "id": 2,<br>
          "start": "03-jul-2017 10:00:00",<br>
          "end": "03-jul-2017 11:00:00",<br>
          "title": "Pellentesque leo ligula",<br>
          "info": "Pellentesque leo ligula, vulputate eget placerat vitae, hendrerit sed nisl. Proin luctus velit elit, egestas molestie neque pulvinar quis.",<br>
          "attendees": [<br>
            {<br>
              "_id": "58eba3c35bfc465abb9f7912",<br>
              "user_id": "58d1b268e399d35a62a839d3",<br>
              "name": "Manuela Delgado"<br>
            }<br>
          ]<br>
        }<br>
      ]<br>
    },<br>
    {<br>
      "date": "04-jul-2017",<br>
      "events": [<br>
        {<br>
          "id": 3,<br>
          "start": "04-jul-2017 09:00:00",<br>
          "end": "04-jul-2017 09:30:00",<br>
          "title": "Orci varius natoque",<br>
          "info": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tincidunt sodales turpis, nec tincidunt neque finibus vitae. ",<br>
          "attendees": [<br>
            {<br>
              "_id": "58e4d6e35bfc465abb9f790f",<br>
              "user_id": "58d1b268e399d35a62a839d3",<br>
              "name": "Manuela Delgado"<br>
            }<br>
          ]<br>
        },<br>
        {<br>
          "id": 4,<br>
          "start": "04-jul-2017 09:30:00",<br>
          "end": "04-jul-2017 10:00:00",<br>
          "title": "Aliquam eget felis",<br>
          "info": "Phasellus non neque dictum, sagittis turpis at, dictum augue. Quisque pretium feugiat mauris, sit amet pulvinar velit ultricies sed.",<br>
          "attendees": []<br>
        }<br>
      ]<br>
    }<br>
  ]<br>
}<br>

- **Success Response:**

  - **Code:** 201<br>
    **Content:**

    {<br>
      "_id": "58e4d1425bfc465abb9f790e",<br>
      "__v": 2,<br>
      "city": "Orlando",<br>
      "country": "USA",<br>
      "info": "This year’s premier conference on digital business transformation is right here, the Citrix Synergy 2017 conference. <br>
      This is all about networking with your peers and industry experts, learning with Expert hosted TED-talk sessions and a two-day Instructor-led Learning Labs,
      <br>and most importantly, it’s about discovery, with world class keynotes and innovation super sessions.
      <br>Attend this conference to see how Citrix is redefining the future of business.",<br>
      "name": "Citrix Synergy 2017",<br>
      "state": "FL",<br>
      "sessions": [<br>
        {<br>
          "date": "03-jul-2017",<br>
          "events": [<br>
            {<br>
              "id": 1,<br>
              "start": "03-jul-2017 09:00:00",<br>
              "end": "03-jul-2017 10:00:00",<br>
              "title": "Lorem ipsum ",<br>
              "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet elit magna, eget faucibus dui vehicula vitae. ",<br>
              "attendees": [<br>
                {<br>
                  "_id": "58e63fd45bfc465abb9f7911",<br>
                  "user_id": "58d1b268e399d35a62a839d3",<br>
                  "name": "Manuela Delgado"<br>
                },<br>
                {<br>
                  "_id": "58edf5c873e9c072dfa0c0fb",<br>
                  "user_id": "58d1b200e399d35a62a839cf",<br>
                  "name": "Fischer Underwood"<br>
                }<br>
              ]<br>
            },<br>
            {<br>
              "id": 2,<br>
              "start": "03-jul-2017 10:00:00",<br>
              "end": "03-jul-2017 11:00:00",<br>
              "title": "Pellentesque leo ligula",<br>
              "info": "Pellentesque leo ligula, vulputate eget placerat vitae, hendrerit sed nisl. Proin luctus velit elit, egestas molestie neque pulvinar quis.",<br>
              "attendees": [<br>
                {<br>
                  "_id": "58eba3c35bfc465abb9f7912",<br>
                  "user_id": "58d1b268e399d35a62a839d3",<br>
                  "name": "Manuela Delgado"<br>
                }<br>
              ]<br>
            }<br>
          ]<br>
        },<br>
        {<br>
          "date": "04-jul-2017",<br>
          "events": [<br>
            {<br>
              "id": 3,<br>
              "start": "04-jul-2017 09:00:00",<br>
              "end": "04-jul-2017 09:30:00",<br>
              "title": "Orci varius natoque",<br>
              "info": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tincidunt sodales turpis, nec tincidunt neque finibus vitae. ",<br>
              "attendees": [<br>
                {<br>
                  "_id": "58e4d6e35bfc465abb9f790f",<br>
                  "user_id": "58d1b268e399d35a62a839d3",<br>
                  "name": "Manuela Delgado"<br>
                }<br>
              ]<br>
            },<br>
            {<br>
              "id": 4,<br>
              "start": "04-jul-2017 09:30:00",<br>
              "end": "04-jul-2017 10:00:00",<br>
              "title": "Aliquam eget felis",<br>
              "info": "Phasellus non neque dictum, sagittis turpis at, dictum augue. Quisque pretium feugiat mauris, sit amet pulvinar velit ultricies sed.",<br>
              "attendees": []<br>
            }<br>
          ]<br>
        }<br>
      ]<br>
    }<br>

- **Error Response:**

  - **Code:** 500<br>
    **Content:**

  { <br>
    "error": "Could not create Conference. Error: " + err<br>
   }<br>

- **Sample Call:**

  ```
  http.post("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/conferences", JSON.stringify(conferenceDetails), { 'Content-Type': 'application/json' })
      .map((response: Response) => {
          return response.json();
        }
  });
  ```

# **Update a conference**

Updates single conference's details, if id match found

- **URL**

  `/api/conferences/:id`

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[string]`

  - *Sample Data Params**

  {<br>
    "_id": "58e4d1425bfc465abb9f790e",<br>
    "city": "Orlando",<br>
    "country": "USA",<br>
    "info": "This year’s premier conference on digital business transformation is right here, the Citrix Synergy 2017 conference. <br>
    This is all about networking with your peers and industry experts, learning with Expert hosted TED-talk sessions and a two-day Instructor-led Learning Labs,
    <br>and most importantly, it’s about discovery, with world class keynotes and innovation super sessions.
    <br>Attend this conference to see how Citrix is redefining the future of business.",<br>
    "name": "Citrix Synergy 2017",<br>
    "state": "FL",<br>
    "sessions": [<br>
      {<br>
        "date": "03-jul-2017",<br>
        "events": [<br>
          {<br>
            "id": 1,<br>
            "start": "03-jul-2017 09:00:00",<br>
            "end": "03-jul-2017 10:00:00",<br>
            "title": "Lorem ipsum ",<br>
            "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet elit magna, eget faucibus dui vehicula vitae. ",<br>
            "attendees": [<br>
              {<br>
                "_id": "58e63fd45bfc465abb9f7911",<br>
                "user_id": "58d1b268e399d35a62a839d3",<br>
                "name": "Manuela Delgado"<br>
              },<br>
              {<br>
                "_id": "58edf5c873e9c072dfa0c0fb",<br>
                "user_id": "58d1b200e399d35a62a839cf",<br>
                "name": "Fischer Underwood"<br>
              }<br>
            ]<br>
          },<br>
          {<br>
            "id": 2,<br>
            "start": "03-jul-2017 10:00:00",<br>
            "end": "03-jul-2017 11:00:00",<br>
            "title": "Pellentesque leo ligula",<br>
            "info": "Pellentesque leo ligula, vulputate eget placerat vitae, hendrerit sed nisl. Proin luctus velit elit, egestas molestie neque pulvinar quis.",<br>
            "attendees": [<br>
              {<br>
                "_id": "58eba3c35bfc465abb9f7912",<br>
                "user_id": "58d1b268e399d35a62a839d3",<br>
                "name": "Manuela Delgado"<br>
              }<br>
            ]<br>
          }<br>
        ]<br>
      },<br>
      {<br>
        "date": "04-jul-2017",<br>
        "events": [<br>
          {<br>
            "id": 3,<br>
            "start": "04-jul-2017 09:00:00",<br>
            "end": "04-jul-2017 09:30:00",<br>
            "title": "Orci varius natoque",<br>
            "info": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tincidunt sodales turpis, nec tincidunt neque finibus vitae. ",<br>
            "attendees": [<br>
              {<br>
                "_id": "58e4d6e35bfc465abb9f790f",<br>
                "user_id": "58d1b268e399d35a62a839d3",<br>
                "name": "Manuela Delgado"<br>
              }<br>
            ]<br>
          },<br>
          {<br>
            "id": 4,<br>
            "start": "04-jul-2017 09:30:00",<br>
            "end": "04-jul-2017 10:00:00",<br>
            "title": "Aliquam eget felis",<br>
            "info": "Phasellus non neque dictum, sagittis turpis at, dictum augue. Quisque pretium feugiat mauris, sit amet pulvinar velit ultricies sed.",<br>
            "attendees": []<br>
          }<br>
        ]<br>
      }<br>
    ]<br>
  }<br>

- **Success Response:**

- **Code:** 200<br>
  **Content:**

  {<br>
    message: "conference updated: Citrix Synergy 2017"<br>
  }<br>

- **Error Response:**

- **Code:** 500<br>
  **Content:**

   {<br>
    "error": "Could not update conference"<br>
   }<br>

  - **Code:** 404<br>
    **Content:**

   { <br>
    "error": "Could not find conference. "<br>
   }<br>

- **Sample Call:**

  ```
  http.put("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58ee4f2b0276de0b95e604cb", JSON.stringify(conferenceInfo), { 'Content-Type': 'application/json' });
  ```

# **Delete a conference**

Removes a single conference, if id match found

- **URL**

  `/api/conferences/:id`

- **Method:**

  `DEL`

- **URL Params**

  **Required:**

  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    { <br>
      "Conference removed"<br>
    }<br>

- **Error Response:**

  - **Code:** 403<br>
    **Content:**

  { <br>
    "error": "Cannot remove a conference"<br>
  } <br>

  - **Code:** 404<br>
    **Content:**

  {<br>
    "error": "Could not find conference"<br>
  }<br>

- **Sample Call:**

  ```
  http.del("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/conferences/58ee4f2b0276de0b95e604cb");
  ```

# **Post a Message**

Posts a message

- **URL**

  `/api/users/:user_id/messages`

- **Method:**

  `POST`

- **URL Params**

**Required:**

`user_id=[string]`

- **Data Params**

  `user_id=[string]`<br>
  `content=[string]`<br>

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "message": "message sent"<br>
    }<br>

- **Error Response:**

  None

- **Sample Call:**

  ```
  http.post('https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58d1b638e399d35a62a839e1/messages', JSON.stringify(messageData), { 'Content-Type': 'application/json' }).map(response => response.json())
  ```

# **Update a message**

Marks all messages from specified receiver as read

- **URL**

  `/api/users/:id`

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[string]`

  - **Data Params**

  `other_user_id=[string]`

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    {<br>
      "__v": 11,<br>
      "_id": "58d1b114e399d35a62a839c9",<br>
      "dob": "1969-06-02T00:00:00.000Z",<br>
      "email": "rpsring@gmail.com",<br>
      "name": "Rickey Spring",<br>
      "password": "Password1",<br>
      "phone_number": 879237351,<br>
      "username": "rspring",<br>
      "messages": [<br>
        {<br>
          "_id": "58d1b693e399d35a62a839e3",<br>
          "receiver_id": "58d1b114e399d35a62a839c9",<br>
          "sender_id": "58d1b638e399d35a62a839e1",<br>
          "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
          "read": false,<br>
          "date": "2017-03-21T23:26:11.706Z"<br>
        }<br>
      ]<br>
    }<br>

- **Error Response:**

- **Code:** 500<br>
  **Content:**

  { <br>
    "error": err <br>
  }<br>

- **Sample Call:**

```
http.put('https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58d1b638e399d35a62a839e1/messages', JSON.stringify(58d1b693e399d35a62a839e3), { 'Content-Type': 'application/json' }).map(response => response.json())
```

# **Delete a message**

Removes a single message, if id match found

- **URL**

  `/api/users/:user_id/messages/delete/:id`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `user_id=[string]`
  `id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    { <br>
      "Message removed" <br>
    }<br>

- **Error Response:**

  - **Code:** 500<br>
    **Content:**

  { <br>
    "error": "Could not remove the message"<br>
  } <br>

  - **Code:** 404<br>
    **Content:**

  { <br>
    "error": "Could not find the message" <br>
  } <br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58ee4f2b0276de0b95e604cb/messages/58d1b828022bca5f61f2d0b9");
  ```

# **List Messages**

Returns a list of messages of specified user

- **URL**

  `/api/users/:user_id/messages`

- **Method:**

  `GET`

- **URL Params**

  `user_id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    [<br>
      {<br>
        "date": "2017-03-21T23:26:11.706Z",<br>
        "read": false,<br>
        "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
        "sender_id": "58d1b638e399d35a62a839e1",<br>
        "receiver_id": "58d1b114e399d35a62a839c9",<br>
        "_id": "58d1b693e399d35a62a839e3"<br>
      },<br>
      {<br>
        "date": "2017-03-21T23:26:19.780Z",<br>
        "read": false,<br>
        "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
        "sender_id": "58d1b638e399d35a62a839e1",<br>
        "receiver_id": "58d1b114e399d35a62a839c9",<br>
        "_id": "58d1b69be399d35a62a839e5"<br>
      },<br>
      {<br>
        "date": "2017-03-21T23:26:22.906Z",<br>
        "read": false,<br>
        "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
        "sender_id": "58d1b638e399d35a62a839e1",<br>
        "receiver_id": "58d1b114e399d35a62a839c9",<br>
        "_id": "58d1b69ee399d35a62a839e7"<br>
      },<br>
      {<br>
        "read": true,<br>
        "date": "2017-03-21T23:27:26.925Z",<br>
        "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
        "sender_id": "58d1b114e399d35a62a839c9",<br>
        "receiver_id": "58d1b638e399d35a62a839e1",<br>
        "_id": "58d1b6dee399d35a62a839e8"<br>
      }<br>
    ]<br>

- **Error Response:**

- **Code:** 500<br>

  {<br>
    "Error: " + err <br>
  }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58d1b114e399d35a62a839c9/messages").map((response: Response) => {
      return <any[]>response.json()
  }).
  ```

# **List unread conversations' participants**

Returns a list of ids of users, who participate in unread conversations of a specified user

- **URL**

  `/api/users/:user_id/unread`

- **Method:**

  `GET`

- **URL Params**

  `user_id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    [<br>
      "58d1b638e399d35a62a839e1",<br>
      "58d1b268e399d35a62a839d3"<br>
    ]<br>

- **Error Response:**

- **Code:** 500<br>

  {<br>
    "Error: " + err <br>
  }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58d1b114e399d35a62a839c9/unread").map((response: Response) => {
      return <any[]>response.json()
  }).
  ```

# **List Messages**

Returns a list of messages between two specified users

- **URL**

  `/api/users/:user_id/messages/:sender_id`

- **Method:**

  `GET`

- **URL Params**

  `user_id=[string]`
  `sender_id=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    [<br>
      {
        "date": "2017-03-21T23:26:11.706Z",<br>
        "read": false,<br>
        "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
        "sender_id": "58d1b638e399d35a62a839e1",<br>
        "receiver_id": "58d1b114e399d35a62a839c9",<br>
        "_id": "58d1b693e399d35a62a839e3"<br>
      },<br>
      {<br>
        "date": "2017-03-21T23:26:19.780Z",<br>
        "read": false,<br>
        "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
        "sender_id": "58d1b638e399d35a62a839e1",<br>
        "receiver_id": "58d1b114e399d35a62a839c9",<br>
        "_id": "58d1b69be399d35a62a839e5"<br>
      },<br>
      {<br>
        "date": "2017-03-21T23:26:22.906Z",<br>
        "read": false,<br>
        "content": "Nam et condimentum lorem, id efficitur magna. In egestas nisl quis venenatis<br> elementum. Vivamus at maximus tortor. Aliquam faucibus enim.",<br>
        "sender_id": "58d1b638e399d35a62a839e1",<br>
        "receiver_id": "58d1b114e399d35a62a839c9",<br>
        "_id": "58d1b69ee399d35a62a839e7"<br>
      }<br>
    ]<br>

- **Error Response:**

- **Code:** 500<br>

  {<br>
    "Error: " + err <br>
  }<br>

- **Sample Call:**

  ```
  http.get("https://psdev-ddevzfptl2ipflrc65bekwnn-evals-dev.mbaas1.tom.redhatmobile.com/api/users/58d1b114e399d35a62a839c9/messages/58d1b638e399d35a62a839e1").map((response: Response) => {
      return <any[]>response.json()
  }).
    ```
