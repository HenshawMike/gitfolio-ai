import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-300">Sign in to continue building your portfolio</p>
        </div>
        <div className="glass p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 transition-all duration-300 transform hover:scale-[1.02]',
                card: 'bg-transparent shadow-none p-0',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                formFieldInput: 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500/50 focus:bg-white/10 transition-all',
                formFieldLabel: 'text-gray-300',
                footerActionLink: 'text-blue-400 hover:text-blue-300 transition-colors',
                dividerLine: 'bg-white/10',
                dividerText: 'text-gray-400',
                socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all',
                socialButtonsBlockButtonText: 'text-white font-medium',
                formFieldAction: 'text-blue-400 hover:text-blue-300',
                identityPreviewText: 'text-white',
                identityPreviewEditButton: 'text-blue-400 hover:text-blue-300'
              },
              layout: {
                socialButtonsPlacement: 'bottom',
                socialButtonsVariant: 'blockButton'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}