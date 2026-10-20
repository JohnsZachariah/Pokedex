"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      
      if (!res.ok) {
        throw new Error("Pokémon not found!");
      }

      const data = await res.json();
      router.push(`/pokemon/${data.name}`);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "2rem",alignItems: "center", display: "flex", flexDirection: "column" }}>
        <Image
        src="/char-pikachu.png"
        alt="Pokédex logo"
        width={200}
        height={200}
        priority
        style={{ marginBottom: "1.5rem", height: "auto", width: "auto" }}
      />
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a Pokémon (e.g., pikachu)"
          style={{
            padding: "0.8rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "2px solid var(--pika-dark)",
            flex: 1,
            outline: "none",
            width: "60vw"
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.8rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "var(--pika-yellow)",
            color: "var(--pika-dark)",
            border: "2px solid var(--pika-dark)",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      
      {error && <p style={{ color: "var(--pika-red)", marginTop: "0.5rem", fontWeight: "bold" }}>{error}</p>}
    </div>
  );
}