export function SearchInput({search, setSearch, placeholder}: {search: string, setSearch: (value: string) => void, placeholder: string}) {
    return(
        <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border border-gray-500 rounded-lg px-3 py-2"
      />
    )
}