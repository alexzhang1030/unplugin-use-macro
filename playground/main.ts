document.getElementById('app')!.innerHTML = '__UNPLUGIN__'

useMarco('log', (node) => {
  // eslint-disable-next-line no-console
  console.log(node)
})

log$: [
  'hello world',
  'world hello',
]
