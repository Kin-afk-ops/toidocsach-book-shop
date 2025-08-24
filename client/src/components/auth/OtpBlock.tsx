"use client";
import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

interface ChildProps {
  isCounting: boolean;
  setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
}

const OtpBlock: React.FC<ChildProps> = ({ isCounting, setIsCounting }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSendOtp = () => {
    // TODO: gọi API gửi OTP
    setTimeLeft(300);
    setIsCounting(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {isCounting && (
        <div className="text-sm text-gray-500 mb-6">
          OTP có hiệu lực trong {formatTime(timeLeft)}
        </div>
      )}

      <InputOTP maxLength={6} className="flex gap-2">
        <InputOTPGroup className="flex gap-2">
          <InputOTPSlot
            index={0}
            className="border-2 border-gray-700 rounded-lg w-12 h-12 text-xl font-bold text-center"
          />
          <InputOTPSlot
            index={1}
            className="border-2 border-gray-700 rounded-lg w-12 h-12 text-xl font-bold text-center"
          />
          <InputOTPSlot
            index={2}
            className="border-2 border-gray-700 rounded-lg w-12 h-12 text-xl font-bold text-center"
          />
        </InputOTPGroup>

        <InputOTPSeparator className="mx-2" />

        <InputOTPGroup className="flex gap-2">
          <InputOTPSlot
            index={3}
            className="border-2 border-gray-700 rounded-lg w-12 h-12 text-xl font-bold text-center"
          />
          <InputOTPSlot
            index={4}
            className="border-2 border-gray-700 rounded-lg w-12 h-12 text-xl font-bold text-center"
          />
          <InputOTPSlot
            index={5}
            className="border-2 border-gray-700 rounded-lg w-12 h-12 text-xl font-bold text-center"
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OtpBlock;
