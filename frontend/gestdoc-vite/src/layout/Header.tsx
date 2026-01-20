export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <h1 className="text-xl font-semibold">Gestão Documental</h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">António</span>
        <img
          src="/avatar.svg"
          alt="Perfil"
          className="h-8 w-8 rounded-full border"
        />
      </div>
    </header>
  )
}
