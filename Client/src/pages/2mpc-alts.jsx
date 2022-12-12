import '../App.css';
import { ComboTable } from "../helpers/tables";
import { changeMap } from '../helpers/maps.js';

let OG = [], ALT = [], mapList = [];

const columns = [
    {
        name: 'Tower',
        selector: row => row.Tower,
        sortable: true,
    },
];

mapList.forEach(map => {
  columns.push({
      name: map['Abbrev.'],
      selector: row => ALT.concat(changeMap(OG, 'Map')).map(ele => (ele.Map === map['Abbrev.'] && ele.Number === row.Number) ? '✔️' : ''),
      width:'55px'
})}) 

const customStyles = {
  headRow: {
    style: {
      fontWeight: "bold",
      fontSize: "11px",
      borderBottomColor: "#76a576",
    },
  },
  rows: {
    style: {
      "&:not(:last-of-type)": {
        borderBottomColor: "#76a576",
      },
    },
  },
  pagination: {
    style: {
      borderTopColor: "#76a576",
    },
  },
};

export function TwoMPCAlts() {
    return (
    <ComboTable
        title = {<b>Two Mega Pops CHIMPS Alt Maps Tracker</b>}
        columns = {columns}
        data = {OG}
        dense
        customStyles={customStyles}
    />
    );
}