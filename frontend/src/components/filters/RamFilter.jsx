import React, { useEffect, useState } from "react";
import { Checkbox, Card } from "antd";

const RAM_OPTIONS = ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB", "32GB"];

const RamFilter = ({ handleFilterChange }) => {
  const [selectedRams, setSelectedRams] = useState([]);

  
  useEffect(() => {
    handleFilterChange("ram", selectedRams);
  }, [selectedRams, handleFilterChange]);

  useEffect(() => {
    console.log("Selected RAMs →", selectedRams);
  }, [selectedRams]);

  return (
    <Card title="Filter By RAM" className="w-full mx-auto mt-10 p-4">
      <Checkbox.Group
        options={RAM_OPTIONS}
        value={selectedRams} 
        onChange={setSelectedRams}
        className="flex flex-col gap-2"
      />
    </Card>
  );
};

export default RamFilter;
