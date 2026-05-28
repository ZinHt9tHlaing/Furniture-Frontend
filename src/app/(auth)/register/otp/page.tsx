import { InputOTPForm } from '@/components/auth/otp-form'

const OtpPage = () => {
  return (
     <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <InputOTPForm />
      </div>
    </div>
  )
}

export default OtpPage