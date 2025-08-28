import React, { useState } from "react";

import useLoginSignupAnimation from "../hooks/useLoginSignupAnimation";
import ContactCardContainer from "../components/ContactCardContainer";

const Contact = () => {
  const [message, setMessage] = useState("");
  const { containerRef, gifRef, formRef } = useLoginSignupAnimation()


  return (
    <div ref={containerRef} className="min-h-screen relative bg-gradient-to-br from-purple-700 to-orange-700 flex items-center justify-center p-6">

      {/* Card Container */}
      <ContactCardContainer
        containerRef={containerRef}
        formRef={formRef}
        gifRef={gifRef}
        message="We are here to help you!"
      />
    </div>
  );
};

export default Contact;
