import { useState, useEffect } from "react";
import Select from "../../components/Select/Select";
import Accordion from "../../components/Accordion/Accordion";
import { DateRange } from "react-date-range";
import { isAfter, isBefore, parseISO } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./Top100.css";
const ITUNES_API = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

export default function Top100() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dateRanges, setDateRanges] = useState([
    {
      startDate: new Date("1960-01-01"),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    async function getItunesData() {
      const resp = await fetch(ITUNES_API);
      const data = await resp.json();
      const final = data.feed.entry.map((item) => {
        return {
          title: item["im:name"].label,
          body: renderBody(item),
          category: item.category.attributes["im:id"],
          releaseDate: parseISO(item["im:releaseDate"].label),
        };
      });
      setData(final);
      setFilteredData(final);

      const categoryMap = {}
      const allCategories = data.feed.entry.filter((item) => {
        const id = item.category.attributes["im:id"]
        if((id in categoryMap)) {
            return false
        } else {
            categoryMap[id] = 1
            return true
        }
        
      }).map(item => {
        return {
            value: item.category.attributes["im:id"],
            label: item.category.attributes.label,
          };
      });
      setCategories(allCategories);
    }
    getItunesData();
  }, []);

  function setSelected(category) {
    if(Number(category)===-1) {
        setFilteredData(data)
        return
    }
    const filteredMusic = data.filter((item) => item.category === category);
    setFilteredData(filteredMusic);
  }

  function setDate(selection) {
    const filteredMusic = data.filter((item) => {
      return (
        isAfter(item.releaseDate, selection.startDate) &&
        isBefore(item.releaseDate, selection.endDate)
      );
    });
    setFilteredData(filteredMusic);
    setDateRanges([selection]);
  }

  function renderBody(bodyData) {
    return (
      <div className="body-item-parent">
        <div className="body-item">
          <b>Author: </b>
          {bodyData["im:artist"].label}
        </div>
        <div className="body-item">
          <b>Price: </b>
          {bodyData["im:price"].label}
        </div>
        <div className="body-item">
          <b>Release Date: </b>
          {bodyData["im:releaseDate"].attributes.label}
        </div>
        <div className="body-item">{bodyData["rights"].label}</div>
      </div>
    );
  }

  return (
    <div className="top100">
        <div className="filters">
        <Select
        options={categories}
        setSelected={setSelected}
        name="Select Categories"
      />
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDate(item.selection)}
        moveRangeOnFirstSelection={false}
        ranges={dateRanges}
      />

        </div>
      
      <Accordion data={filteredData} />
    </div>
  );
}
