import { useMemo } from "react";
import { useAppContext } from "../../context/AppContext";

type StatData = {
  hp: number;
  attack: number;
  defense: number;
};

function Stats() {
  const { state } = useAppContext();
  const { data } = state.pokemon.detail;

  const monsterStat = useMemo(() => {
    const statResult: StatData = {
      hp: 0,
      attack: 0,
      defense: 0,
    };

    if (!data) return statResult;

    statResult.hp =
      data.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0;
    statResult.attack =
      data.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0;
    statResult.defense =
      data.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0;

    return statResult;
  }, [data]);

  if (!data) return null;

  return (
    <div className="w-full rounded-2xl bg-dark p-4">
      <p>Health</p>
      <div className="bg-main-background rounded-full w-full overflow-hidden h-2">
        <div
          style={{
            background: "linear-gradient(to right, #6CF0A1, #2AE3B7)",
            width: `${(monsterStat.hp / 1000) * 100}%`,
          }}
          className="h-2 rounded-lg"
        ></div>
      </div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold text-2xl">{monsterStat.hp}</span>
        <span>from</span>
        <span>1000</span>
      </div>
      <hr className="border-light-grey my-2" />
      <div className="flex">
        <div className="w-1/2">
          <p className="text-light-grey">Attack</p>
          <p className="font-bold text-2xl">{monsterStat.attack}</p>
        </div>
        <div className="w-1/2">
          <p className="text-light-grey">Defense</p>
          <p className="font-bold text-2xl">{monsterStat.defense}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
