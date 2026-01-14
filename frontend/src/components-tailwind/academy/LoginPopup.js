import React, {useEffect, useState} from 'react';

const LoginPopup = ({handleSubmit}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePopup = () => setIsOpen(!isOpen);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log({username, password});
        const data = {username: username, password: password};
        handleSubmit(data);
    };

    useEffect(() => {
        togglePopup();
    }, []);

    return (
        <div className="relative">
            {/* Trigger Button */}
            {/*<button
        onClick={togglePopup}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login
      </button>*/}

            {/* Popup Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-gary-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    {/* Popup Container - Responsive sizing */}
                    <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-green-500 text-white p-4">
                            <h2 className="text-xl font-bold">Login</h2>
                            <button
                                onClick={togglePopup}
                                className="absolute top-4 right-4 text-white hover:text-gray-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLoginSubmit} className="p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    Sign In
                                </button>

                                {/*<div className="text-sm text-center sm:text-right">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>*/}
                            </div>
                        </form>

                        {/* Footer */}
                        {/* <div className="bg-gray-100 px-6 py-4 text-center">
                <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </a>
              </p>
            </div>*/}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPopup;