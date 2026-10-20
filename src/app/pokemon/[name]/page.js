import { Suspense } from "react";
import PokemonContent from "./PokemonContent";

async function PokemonWrapper({ params }) {
  const { name } = await params;
  return <PokemonContent name={name} />;
}

export default function PokemonDetails({ params }) {
  return (
    <Suspense fallback={<h2 style={{ padding: "20px" }}>Loading Pokémon...</h2>}>
      <PokemonWrapper params={params} />
    </Suspense>
  );
}