import { useState, useEffect } from "react";
import AccordionItem from "../AccordionItem/AccordionItem";
import "./Accordion.css";
export default function Accordion({ data, canOpenMulti }) {
  const [activeTabs, setActive] = useState([]);

  useEffect(() => {
    const items = Array(data.length).fill({
      isActive: false,
      isFavorite: false,
    });
    setActive(items);
  }, [data]);

  function toggleTrait(e, type, id) {
    e.stopPropagation();
    let newTabs = activeTabs.map((tab, index) => {
      if (index === id) {
        return { ...tab, [type]: !tab[type] };
      } else {
        return tab;
      }
    });
    setActive(newTabs);
  }

  return (
    <ul className="accordion-list-parent">
      {data.map(({ title, body }, index) => {
        return (
          <li key={index}>
            {data.length && (
              <AccordionItem
                title={title}
                body={body}
                index={index}
                toggleTrait={toggleTrait}
                isActive={activeTabs[index]?.isActive || false}
                isFavorite={activeTabs[index]?.isFavorite || false}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
