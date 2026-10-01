import { TOOL_GROUPS, CORE_TOOLS } from "@/data/tools";
import { WrenchIcon } from "@/components/icons";

export function Tools() {
  return (
    <section id="tools" className="tools">
      <div className="container">
        <div className="fade-in">
          <div className="section-heading">
            <span className="section-tag" aria-hidden="true"><WrenchIcon /></span>
            <h2 className="section-title">Tools &amp; Technologies</h2>
          </div>

          <div className="tools-list">
            {TOOL_GROUPS.map((group) => (
              <div key={group.title} className="tools-row">
                <h3 className="tools-row-title">{group.title}</h3>
                <ul className="tools-chips">
                  {group.tools.map((tool) => {
                    const core = CORE_TOOLS.has(tool);
                    return (
                      <li key={tool} className={core ? "tool-chip tool-chip-core" : "tool-chip"}>
                        {tool}
                        {core && <span className="visually-hidden"> (core stack)</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
