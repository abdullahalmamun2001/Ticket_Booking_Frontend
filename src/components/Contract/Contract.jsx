// import React, { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";
// import { Toaster, toast } from "react-hot-toast";

// const ContractForm = () => {
//   const formRef = useRef();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     emailjs
//       .sendForm(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//         formRef.current,
//         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//       )
//       .then(
//         (result) => {
//           toast.success("Contract request sent successfully!");
//           formRef.current.reset();
//         },
//         (error) => {
//           console.error(error.text);
//           toast.error("Failed to send request.");
//         }
//       )
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-[#B3E5E4] to-[#D0F0F2] rounded-xl shadow-lg border border-primary">
//       <Toaster />
//       <h2 className="text-3xl font-bold mb-6 text-center text-primary">
//         Contract Request Form
//       </h2>

//       <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           required
//           className="w-full p-3 border rounded"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           required
//           className="w-full p-3 border rounded"
//         />

//         <input
//           type="text"
//           name="contractNumber"
//           placeholder="Contract Number"
//           required
//           className="w-full p-3 border rounded"
//         />

//         <textarea
//           name="description"
//           placeholder="Description / About"
//           rows={5}
//           required
//           className="w-full p-3 border rounded resize-none"
//         ></textarea>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded transition-all disabled:opacity-50"
//         >
//           {loading ? "Sending..." : "Send Request"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

const ContractForm = () => {
  

 

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-[#B3E5E4] to-[#D0F0F2] rounded-xl shadow-lg border border-primary">
   
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Contract Request Form
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="contractNumber"
          placeholder="Contract Number"
          required
          className="w-full p-3 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description / About"
          rows={5}
          required
          className="w-full p-3 border rounded resize-none"
        ></textarea>

        <button
          type="submit"
        
          className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded transition-all disabled:opacity-50"
        >
        Send
        </button>
      </form>
    </div>
  );
};

export default ContractForm;
