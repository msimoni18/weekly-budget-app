import { Link, Outlet } from 'react-router-dom'

const routes = [
  { route: '/', name: 'Home' },
  { route: '/transactions', name: 'Transactions' },
]

export default function Layout() {
  return (
    <div className="w-full max-w-lg justify-center m-auto mb-5">
      <nav className="flex items-center justify-between mb-5 border-b">
        <ul className="flex">
          {routes.map((route, index) => (
            <li key={index} className="p-2 hover:bg-zinc-500">
              <Link to={route.route}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
