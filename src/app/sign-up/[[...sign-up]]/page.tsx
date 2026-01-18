import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join GitFolio</h1>
          <p className="text-white/80">Create your account to get started</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: 'bg-white text-gray-900 hover:bg-gray-100',
              card: 'bg-white/95 backdrop-blur-sm border-0 shadow-2xl',
              headerTitle: 'text-gray-900',
              headerSubtitle: 'text-gray-600',
              formFieldInput: 'border-gray-300 focus:border-blue-500',
              footerActionLink: 'text-blue-600 hover:text-blue-700',
            },
          }}
        />
      </div>
    </div>
  )
}