/** A chain of stages. Nodes inside one stage run in parallel; stages run in order. */
export function ChainGraph({
  stages,
  animated = false,
  label = "Example chain",
}: {
  stages: string[][];
  animated?: boolean;
  label?: string;
}) {
  return (
    <ol className={`chain${animated ? " chain--animated" : ""}`} aria-label={label}>
      {stages.map((nodes, s) => (
        <li className="chain-stage" key={nodes.join("|")} style={{ ["--s" as string]: s }}>
          <ul className="chain-nodes">
            {nodes.map((n) => (
              <li className="chain-node" key={n} style={{ ["--s" as string]: s }}>
                {n}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
