

export function DefaultButton(props: { children: any, className?: string, size?: 'lg' | 'sm' }) {

  return (
    <button className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      {props.children}
    </button>
  )
}
