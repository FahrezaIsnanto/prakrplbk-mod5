import React, { useContext, useEffect, useState } from "react";
import { CountryContext } from "../CountryContext";
import {
  TextField
} from "@mui/material";

function Halo() {
  const { country, setCountry } = useContext(CountryContext);
  const [cSearch, setCSearch] = useState("");

  useEffect(function(){
    const newCountry = country.filter(function(cn){
      console.log('search',cSearch);
      var countryName = cn.name.common.toLowerCase();
      return countryName.includes(cSearch.toLowerCase());
    });
    console.log('newCountry',newCountry);
    setCountry(newCountry);
  },[cSearch])

    return (
      <div>
        <TextField
          name="country"
          label="Country"
          value={cSearch}
          onChange={(event) => setCSearch(event.target.value)}
        />
        {country.map((d) => (
                <p>{`${d.name.common} \n ${d.status} \n ${d.region}`}</p>
              ))}
      </div>
    );
  }
  export default Halo;
  