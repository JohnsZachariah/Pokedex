"use client";
import { useState, useEffect } from "react";

export default function PokemonContent({ name }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Pokémon not found!");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [name]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (error) return <h2 style={{ color: "red", padding: "20px" }}>{error}</h2>;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        border: "4px solid var(--pika-dark)",
        borderRadius: "16px",
      }}
    >
      <h1 style={{ textTransform: "capitalize" }}>
        {pokemon.name} #{pokemon.id}
      </h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width={200}
      />
      <h3>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</h3>
      <h3>Height: {pokemon.height / 10} m</h3>
      <h3>Weight: {pokemon.weight / 10} kg</h3>

      
      <h3>Base Experience: {pokemon.base_experience}</h3>
      <h3>
        Abilities: {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </h3>
      <h3>HP: {pokemon.stats[0].base_stat}</h3>
      <h3>Attack: {pokemon.stats[1].base_stat}</h3>
      <h3>Defense: {pokemon.stats[2].base_stat}</h3>
      <h3>Speed: {pokemon.stats[5].base_stat}</h3>
    </div>
  );
}