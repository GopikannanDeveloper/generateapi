import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const Generate = () => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      apiMethodType: "",
      apiBaseUrl: "",
      apiName: "",
      hasMultipleInputs: false,
      parameters: [{ dataType: "", name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parameters",
  });

  const hasMultipleInputs = watch("hasMultipleInputs");

  const onSubmit = (data) => {
    console.log("FORM DATA 👉", data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Create API</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Method
            </label>

            <select
              {...register("apiMethodType")}
              className="w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" selected hidden>Select Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* Base URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base URL
            </label>
            <input
              type="text"
              {...register("apiBaseUrl")}
              placeholder="api/product/create"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* API Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Name
            </label>
            <input
              type="text"
              {...register("apiName")}
              placeholder="CreateProduct"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
            id="hasMultipleInputs"
              type="checkbox"
              {...register("hasMultipleInputs")}
              className="h-4 w-4 text-blue-600"
            />
            <label for="hasMultipleInputs" className="text-sm text-gray-700">Has Multiple Inputs</label>
          </div>

          {/* Parameters */}
          {hasMultipleInputs && (
            <div className="border rounded-md p-4 bg-gray-50 space-y-3">
              <h4 className="font-medium text-gray-800">Parameters</h4>

              {fields.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-center">
                  <input
                    placeholder="dataType"
                    {...register(`parameters.${index}.dataType`)}
                    className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    placeholder="name"
                    {...register(`parameters.${index}.name`)}
                    className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ dataType: "", name: "" })}
                className="text-blue-600 text-sm hover:underline"
              >
                ➕ Add Parameter
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Generate;
