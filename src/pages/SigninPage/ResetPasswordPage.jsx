import 'preline/preline';
import {Link} from 'react-router-dom'
import background from '../../assets/image/background.jpg'

const ResetPasswordPage = () => {
    return (
      <div className='relative flex items-center justify-center min-h-screen min-w-screen bg-cover bg-center' style={{ backgroundImage: `url(${background})` }}>
      <div className="w-full max-w-md mx-auto bg-white/30 backdrop-blur-lg border border-white/30 rounded-xl shadow-sm">
          <div className="mt-7">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">Forgot password?</h1>
              <p className="mt-2 text-sm text-gray-600">
                Remember your password?
                <Link to="/login" className="text-red-600 decoration-2 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
    
            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label for="email" className="block text-sm mb-2">Email address</label>
                    <div className="relative">
                      <input type="email" id="email" name="email" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error"/>
                      <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>
    
                  <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">Reset password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ResetPasswordPage;