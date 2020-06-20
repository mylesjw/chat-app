export default function sendMessage(contents, date, userId, channelId) : void {
  fetch('/api/messages', {
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
  }).then((res) => console.log(res))
}