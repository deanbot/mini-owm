# mini-owm

Mini-OpenWeatherMap is a light-weight wrapper around Open Weather Map's [One Call Api](https://openweathermap.org/api/one-call-api).

MiniOwm is simple but versatile. Use it in any of the following ways or mix and match.

### Constructor parameters

```js
const OwmApi = import('mini-owm');

// constructor parameters are all optional
const api = new OwmAPi(
  '<your api key here>', // owm api key
  33.441792, // latitude
  -94.037689, // longitude
  'hourly,minutely' // exclude
);

api.get().then(res => {
  console.log(res);
});
```

### Chaining

```js
const OwmApi = import('mini-owm');
const api = new OwmAPi();
api
  .apiKey('<your api key here>')
  .latitude(33.441792)
  .longitude(-94.037689)
  .exclude('hourly,minutely')
  .get()
  .then(res => {
    console.log(res);
  });
```

### Get Parameters

```js
const OwmApi = import('mini-owm');
new OwmAPi()
  .get({
    apiKey: '<your api key here>',
    coords: {
      latitude: 33.441792,
      longitude: -94.037689,
    },
    exclude: 'hourly,minutely'
  })
  .then(res => {
    console.log(res);
  });
```

# Development

- Note: MiniOwm is written in TypeScript.
- Setup: `pnpm install`
- Configure: create `.env` with contents: `API_KEY=<your api key here>`
- Serve: `pnpm run start`

See [./index.ejs].

## Runtimes

Latest tested runtimes

- node: 10.16.3
- pnpm: 2.15.1
