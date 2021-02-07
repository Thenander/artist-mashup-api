# Music artist mashup API

###### A restful API that delivers musical artist information and their album releases

### How?

By combining different API's it collects artist name, artist description and album releases together with image-URL's.

The API's used in **Music artist mashup API** are

- [MusicBrainz](http://musicbrainz.org/ws/2)
- [Wikidata](https://www.wikidata.org/w/api.php)
- [Wikipedia](https://en.wikipedia.org/w/api.php)
- [Cover Art Archive](http://coverartarchive.org/)

## Starting the application

1. Make sure you have the latest stable version of **Node.js** installed. ([nodejs.org/en/download](https://nodejs.org/en/download/))

2. Change directory to the root folder of **Music artist mashup API**.

   Ex.

   ```shell
   $ cd artist-mashup-api
   ```

3. Install the dependencies

   ```shell
   $ npm install
   ```

4. Start the server

   ```shell
   $ npm start
   ```

   The server will use port 3001

5. Start your browser and go to this URL: http://localhost:3001/music/artists

### Endpoints

As this API is a **POC** (Proof Of Concept), there are currently only one valid endpoint available (except for the dummy one above).

```
GET /music/artist/{mbid}
```

The `mbid` is an identifier used by MusicBrainz to find the relevant and correct artist. You can find MBID's on their website https://musicbrainz.org, by searching for artists.

Here are a few examples of searches that you can do on the **Music artist mashup API**:

- [David Bowie](http://localhost:3001/music/artists/5441c29d-3602-4898-b1a1-b77fa23b8e50), 5441c29d-3602-4898-b1a1-b77fa23b8e50

- [Aretha Franklin](http://localhost:3001/music/artists/2f9ecbed-27be-40e6-abca-6de49d50299e), 2f9ecbed-27be-40e6-abca-6de49d50299e

- [Coldplay](http://localhost:3001/music/artists/cc197bad-dc9c-440d-a5b5-d52ba2e14234), cc197bad-dc9c-440d-a5b5-d52ba2e14234

- [Public Enemy](http://localhost:3001/music/artists/bf2e15d0-4b77-469e-bfb4-f8414415baca), bf2e15d0-4b77-469e-bfb4-f8414415baca

The return from the API will be a json object, that looks something like this (but with information instead of dots):

```json
{
  "mbid": "...",
  "artistName": "...",
  "description": "...",
  "albums": [
    {
      "title": "...",
      "id": "...",
      "image": "http://..."
    }
  ],
  "pagination": {
    "numberOfItems": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "nextPage": 2,
    "previousPage": 0,
    "lastPage": 1,
    "pageLimit": 1
  }
}
```

### Pagination

As there are lots of releases available from the bigger artists, we're using pagination to get a chunk at a time. The default limit (number of albums) is 25, but this can be changed with queries, as well as the page requested.

Add `page={number}` and `limit={number}` that suits your needs.

> NOTE! The maximum limit in one request is 100. If limit is set to a higher number it will default to 100.

_If no page or limit parameter is sent the default will be `page=1` and `limit=25`._

Example [link](http://localhost:3001/music/artists/5700dcd4-c139-4f31-aa3e-6382b9af9032?limit=5&page=2):
`http://localhost:3001/music/artists/5700dcd4-c139-4f31-aa3e-6382b9af9032?limit=5&page=2`

## Reflections

A problem with the response from MusicBrainz artist releases is that the `release-group-count` - a sum total of all releases - includes singles and other media, as well as albums. So when using pagination, the number of releases (and therefore pages) can be far more than the number of albums displayed. I haven't been able to solve that.
