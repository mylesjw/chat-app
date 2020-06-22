export function getChannels() : Promise<any> {
  return fetch('/api/channels')
    .then((data) => data.json())
}

export function createChannel(name: String) {
  return fetch('/api/channels', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name
    })
  })
}