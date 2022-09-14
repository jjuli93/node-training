## List movies
- HTTP method: Get
- HTTP path: `/movies`
- path parameters:
- query parameters parameters: `limit, offset, title, sort_by`
- Possible HTTP response codes: `200`
- Success response schema:
  `[
    {
      id: string,
      title: string,
      tagline: string,
      overview: string,
      release_date: string,
      poster_url: string,
      backdrop_url: string,
      imdb_id: string
    }
  ]`
- Error response schema:
  `{
    code: string,
    message: string
  }`


## Get movie
- HTTP method: Get
- HTTP path: `/movies/{movie_id}`
- path parameters: `movie_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `
    {
      id: string,
      title: string,
      tagline: string,
      overview: string,
      release_date: string,
      poster_url: string,
      backdrop_url: string,
      imdb_id: string
    }
  `
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Get user lists
- HTTP method: Get
- HTTP path: `/users/{user_id}/lists`
- path parameters: `user_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `[
    {
      id: string,
      name: string,
      description: string,
      public: boolean
    }
  ]`
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Create list
- HTTP method: POST
- HTTP path: `/lists`
- path parameters: 
- query parameters parameters:
- Possible HTTP response codes: `201`
- Success response schema:
  `
    {
      id: string,
      name: string,
      description: string,
      public: boolean
    }
  `
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Get list
- HTTP method: Get
- HTTP path: `/lists/{list_id}`
- path parameters: `list_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `
    {
      id: string,
      name: string,
      description: string,
      public: boolean
    }
  `
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Update list
- HTTP method: Put
- HTTP path: `/lists/{list_id}`
- path parameters: `list_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `
    {
      id: string,
      name: string,
      description: string,
      public: boolean
    }
  `
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Delete list
- HTTP method: DELETE
- HTTP path: `/lists/{list_id}`
- path parameters: `list_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Add movie to list
- HTTP method: POST
- HTTP path: `/lists/{list_id}/movies`
- path parameters: `list_id`
- query parameters parameters:
- Possible HTTP response codes: `201`
- Success response schema:
  `[
    {
      id: string,
      title: string,
      tagline: string,
      overview: string,
      release_date: string,
      poster_url: string,
      backdrop_url: string,
      imdb_id: string
    }
  ]`
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Remove movie from list
- HTTP method: DELETE
- HTTP path: `/lists/{list_id}/movies/{movie_id}`
- path parameters: `list_id, movie_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `[
    {
      id: string,
      title: string,
      tagline: string,
      overview: string,
      release_date: string,
      poster_url: string,
      backdrop_url: string,
      imdb_id: string
    }
  ]`
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Get genres
- HTTP method: GET
- HTTP path: `/genres`
- path parameters:
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `[
    {
      id: string,
      name: string,
    }
  ]`
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Get user profile
- HTTP method: GET
- HTTP path: `/users/{user_id}`
- path parameters: `user_id`
- query parameters parameters: 
- Possible HTTP response codes: `200`
- Success response schema:
  `
    {
      id: string,
      email: string,
      full_name: string,
      photo_path: string,
    }
  `
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Update user profile
- HTTP method: PUT
- HTTP path: `/users/{user_id}`
- path parameters: `user_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `
    {
      id: string,
      email: string,
      full_name: string,
      photo_path: string,
    }
  `
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Upload user photo
- HTTP method: POST
- HTTP path: `/users/{user_id}/photo`
- path parameters: `user_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
  `
    {
      photo_path: string
    }
  `
- Error response schema:
  `{
    code: string,
    message: string
  }`

## Remove user photo
- HTTP method: DELETE
- HTTP path: `/users/{user_id}/photo`
- path parameters: `user_id`
- query parameters parameters:
- Possible HTTP response codes: `200`
- Success response schema:
- Error response schema:
  `{
    code: string,
    message: string
  }`
