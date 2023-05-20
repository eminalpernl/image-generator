import React from "react";

const FormField = () => (
  <div className="form-field">
    <div
    // className="flex items-center gap-2 mb-2"
    >
      <label
        htmlFor=""
        //   className="block text-sm font-medium text-gray-900"
      >
        label
      </label>
    </div>{" "}
    <br />
    <input
    //   type={type}
    //   id={name}
    //   name={name}
    //   //   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
    //   placeholder={placeholder}
    //   value={value}
    //   onChange={handleChange}
    //   required
    />{" "}
    <br />
    <div className="container">
      <p className="col">
        ** Once you have created the image you want, you can share it with
        others in the community **
      </p>
      <button type="submit" className="col create-image-button">
        Create Image
      </button>
    </div>
  </div>
);

export default FormField;
