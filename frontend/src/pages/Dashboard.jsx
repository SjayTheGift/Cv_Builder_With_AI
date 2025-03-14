import AddResume from '../components/AddResume'

const Dashboard = () => {
  return (
    <section className='w-full bg-gray-100 md:h-screen p-3 py-16 text-black'>
      <div className="w-[80%] mx-auto px-10 py-4">
        <h1 className='text-3xl py-2 font-bold'>My Resume</h1>
        <p className='text-1xl'>Start Creating AI resume to your next Job role</p>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5'>
          <AddResume />
        </div>
      </div>
     
     
    </section>
  )
}

export default Dashboard