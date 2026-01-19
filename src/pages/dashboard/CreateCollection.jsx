import React from "react";
import { useDispatch } from "react-redux";
import { createCollection } from "../../features/collections/collectionSlice";
import { useState } from "react";

const CreateCollection = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-3">Create Collection</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Collection name"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => dispatch(createCollection({ name }))}
      >
        Create
      </button>
    </div>
  );
};

export default CreateCollection;
