document.getElementById('app')!.innerHTML = '__UNPLUGIN__'

useMacro('log', (node) => {
  console.log(node)
})

log$: [
  'hello world',
  'world hello',
]
