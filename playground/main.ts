document.getElementById('app')!.innerHTML = '__UNPLUGIN__'

useMarco('log', (node) => {
  console.log(node)
})

log$: [
  'hello world',
  'world hello',
]
