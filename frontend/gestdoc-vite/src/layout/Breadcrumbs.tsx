import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  const segments: string[] = pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-600">
      <ol className="flex space-x-2">
        <li>
          <Link to="/">Início</Link>
        </li>

        {segments.map((seg: string, i: number) => (
          <li key={i} className="flex items-center space-x-2">
            <span>/</span>
            <Link to={`/${segments.slice(0, i + 1).join("/")}`}>
              {seg.charAt(0).toUpperCase() + seg.slice(1)}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
