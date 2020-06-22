export function sendMessage(contents, date, userId, channelId) {
  return fetch('/api/messages', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents,
      date,
      userId,
      channelId
    })
  })
}

export function getMessages(id?: String) {
  return fetch(`/api/messages/${id ? id : ''}`)
    .then(data => data.json())
}

