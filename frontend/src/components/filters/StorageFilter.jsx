import React, { useEffect, useState } from "react";
import { Checkbox, Card } from "antd";

const STORAGE_OPTIONS = ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"];

const StorageFilter = ({ handleFilterChange }) => {
  const [selectedStorage, setSelectedStorage] = useState([]);

  // ✅ Update parent whenever storage selection changes
  useEffect(() => {
    handleFilterChange("storage", selectedStorage);
  }, [selectedStorage, handleFilterChange]);

  // ✅ Optional: log only when storage changes
  useEffect(() => {
    console.log("Selected Storage →", selectedStorage);
  }, [selectedStorage]);

  return (
    <Card title="Filter By Storage" className="w-full mx-auto mt-10 p-4">
      <Checkbox.Group
        options={STORAGE_OPTIONS}
        value={selectedStorage}
        onChange={setSelectedStorage}
        className="flex flex-col gap-2"
      />
    </Card>
  );
};

export default StorageFilter;
