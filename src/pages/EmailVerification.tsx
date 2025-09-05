import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { resendVerificationLink, verifyEmail } from "../store/reducers/authReducer";
import Input from "../components/Input";

const EmailVerification = () => {
  const { token } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isProcessing, isExpired, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [redirecting, setRedirecting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleVerification = async () => {
    if (!token) return;
    const isVerified = await dispatch(verifyEmail(token));
    if (verifyEmail.fulfilled.match(isVerified)) {
      setRedirecting(true);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const sendLinkAgain = async () => {
    if (!email) return;
    const result = await dispatch(resendVerificationLink(email));
    if (resendVerificationLink.fulfilled.match(result)) {
      setLinkSent(true);
    }
  };

  useEffect(() => {
    handleVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Email Verification
        </h2>

        {isProcessing  ? (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-600 font-medium">Verifying...</p>
          </div>
        ) : isExpired ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-red-600 font-semibold">
              Verification link has expired.
            </p>

            {linkSent ? (
              <p className="text-green-600 font-medium">
                ✅ A new verification link has been sent to <b>{email}</b>.
              </p>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}

                />
                <button
                  onClick={sendLinkAgain}
                  disabled={!email || isProcessing}
                  className={`px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50
                     text-white rounded-lg shadow transition`}
                >
                  {
                    isProcessing ? "Sending..." : " Resend Verification Link"
                  }
                </button>
              </>
            )}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              onClick={handleVerification}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
            >
              Retry
            </button>
          </div>
        ) : redirecting ? (
          <div className="flex flex-col items-center">
            <p className="text-blue-600 font-medium animate-pulse">
              Redirecting in {countdown}...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((3 - countdown + 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-2">
              We’ve sent a verification link to your email account.
            </p>
            <p className="text-blue-600 font-medium">
              Please check your inbox and verify.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
