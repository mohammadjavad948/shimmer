

export function DefaultButton(props: { children: any, className?: string, size?: 'lg' | 'sm' }) {

  function size() {
    switch (props.size || 'lg') {
      case 'lg': return "rounded-lg px-4 py-1.5 font-semibold";
      case 'sm': return "rounded-md px-2 py-0.5";
    }
  }

  return (
    <button className={`inline-block text-base leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20 ${size()} ${props.className}`}>
      {props.children}
    </button>
  )
}
