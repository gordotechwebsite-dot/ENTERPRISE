import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (query.trim()) p.set('search', query.trim());
    navigate(`/propiedades?${p.toString()}`);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <div className="flex items-center rounded-full bg-white p-1.5 shadow-xl shadow-black/10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por ciudad, barrio o nombre..."
          className="flex-1 bg-transparent px-5 py-3 text-[15px] text-brand-900 outline-none placeholder:text-brand-400"
        />
        <button
          type="submit"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-white transition-colors hover:bg-brand-800"
        >
          <Search className="h-4.5 w-4.5" />
        </button>
      </div>
    </form>
  );
}
