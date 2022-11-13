import "./AccordionItem.css";
export default function AccordionItem({ title, body, toggleTrait, isActive,isFavorite, index }) {
  return (
    <div className={`accordion-item ${isActive ? "active" : ""}`}>
      <div
        className={`accordion-header ${isActive ? "active" : ""}`}
        onClick={(e) => {
          toggleTrait(e,'isActive',index);
        }}
      >
        <span className={`fa fa-star ${isFavorite? 'checked':''}`} onClick={(e) => {
          toggleTrait(e,'isFavorite',index);
        }}></span>
        <span className="header-title">{title}</span>
      </div>
      {isActive && <div className="accordion-body">{body}</div>}
    </div>
  );
}
