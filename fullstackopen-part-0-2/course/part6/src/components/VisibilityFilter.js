import React from "react";
import { connect } from 'react-redux';
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = (props) => {

    return (
        <div>
            <label>All</label>
            <input 
                type="radio" 
                name="filter" 
                onChange={() => props.filterChange("ALL")} 
            />
            <label>Important</label>
            <input
                type="radio"
                name="filter"
                onChange={() => props.filterChange("IMPORTANT")}
            />
            <label>Non Important</label>
            <input
                type="radio"
                name="filter"
                onChange={() => props.filterChange("NONIMPORTANT")}
            />
        </div>
    );
};

export default connect(null, { filterChange })(VisibilityFilter);
