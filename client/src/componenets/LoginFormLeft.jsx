

const LoginFormLeft = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-indigo-950 border-r border-slate-200 overflow-hidden relative">
      <div className="h-72 w-72  -top-32 -left-32 rounded-full bg-indigo-500/50 blur-3xl absolute" />
       
        <div className="p-12 lg:p-20 flex flex-col items-center justify-center z-10 relative h-full w-full">
           <h2 className="mb-6 leading-tight tracking-tighter text-4xl lg:text-5xl text-white font-medium">Employee <br /> Management System</h2>
          <p className="text-slate-500 text-md max-w-md leading-relaxed">
            Manage Your Acount for payroll,Leaves and track Attendenace
          </p>
        </div>
     
    </div>
  )
}

export default LoginFormLeft
