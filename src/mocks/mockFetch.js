const weatherResponse = {
  current: {},
  forecast: {},
  location: {},
};

export function mockFetch() {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => weatherResponse,
    })
  );
}
