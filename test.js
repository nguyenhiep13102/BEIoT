import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://http://192.168.137.169/:1883', {
  protocolVersion: 4
})

client.on('connect', () => {
  console.log('Connected MQTT')

  client.subscribe('/edge_app_notify', () => {
    console.log('Listening logs...')
  })
})

client.on('message', (topic, message) => {
  console.log('\n========== LOG ==========')

  console.log('Topic:', topic)

  const data = JSON.parse(message.toString())

  console.log(data)
})