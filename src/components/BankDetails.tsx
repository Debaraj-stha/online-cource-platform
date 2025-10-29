interface BankDetailsProps {
  onUpload: () => void;
}

const BankDetails = ({ onUpload }: BankDetailsProps) => {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Bank Transfer</h3>

      <div className="text-gray-700 space-y-2">
        <p>
          <span className="font-medium">Bank Name:</span> Nepal Bank Limited
        </p>
        <p>
          <span className="font-medium">Account Name:</span> Devraj Shrestha
        </p>
        <p>
          <span className="font-medium">Account Number:</span> 1234567890
        </p>
        <p>
          <span className="font-medium">Branch:</span> Kathmandu
        </p>
      </div>

      <button
        onClick={onUpload}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
      >
        Pick Receipt
      </button>

      <p className="text-sm text-gray-500">
        Please upload your bank transfer receipt for verification.
      </p>
    </div>
  );
};

export default BankDetails;
