"use client";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function Page() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
  });

  // To retrieve the field value from GooglePlacesAutocomplete
  const [addressValue, setAddressValue] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addressValue) {
      alert("Please select an address");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div class="h-screen w-screen flex items-center justify-center bg-blue-100">
      <main>
        <form
          className="flex flex-col items-center justify-center w-full"
          onSubmit={handleSubmit}
        >
          <label className="text-xl font-bold">Name</label>
          <input
            className="border-2 border-gray-400 text-center rounded-lg p-2 m-2 w-3/4"
            type="text"
            name="name"
            value={formValue.name}
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <label className="text-xl font-bold">Email</label>
          <input
            className="border-2 border-gray-400 text-center rounded-lg p-2 m-2 w-3/4"
            type="email"
            name="email"
            value={formValue.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label className="text-xl font-bold">Address</label>
          <div className="border-2 border-gray-400 text-center rounded-lg p-2 m-2 w-3/4">
            {/* https://tintef.github.io/react-google-places-autocomplete/docs/ */}
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
              onChange={handleChange}
              selectProps={{
                mapValue: addressValue,
                onChange: setAddressValue,
              }}
              debounce={300}
            />
          </div>

          <br />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-3/4"
            type="submit"
          >
            Submit
          </button>
        </form>

        <br />

        {/* Display form data only if the form has been submitted */}
        {submitted && (
          <div className="flex flex-col items-center justify-center text-center w-full">
            <h2 className="text-2xl font-bold">Form Data</h2>
            <p className="text-l">
              Name: <span className="text-green-700">{formValue.name}</span>
            </p>
            <p className="text-l">
              Email: <span className="text-green-700">{formValue.email}</span>
            </p>
            <p className="text-l">
              Address:{" "}
              <span className="text-green-700">{addressValue.label}</span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
