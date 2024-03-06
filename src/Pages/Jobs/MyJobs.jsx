import { useContext } from "react";
import useFetchData from "../../Comonents/Hooks/UseFetchData/useFetchData";
import { AuthContext } from "../../Comonents/AuthProvider/AuthProvider";
import SingleJobList from "../../Comonents/JobList/SingleJobList";
import Loader from "../../Comonents/Loader/Loader";
import Navbar2 from '../../Comonents/Navbar/Navbar2';

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  console.log(email);
  const {
    data: jobs,
    loading,
    refetch,
  } = useFetchData(`/staticjobpost`, "jobs");

  if (loading) return <Loader />;

  refetch();
  const myJobs = jobs.filter(job => job.hiring_manager_email === email);
  console.log(myJobs);

  return (
    <>
    <Navbar2/>
    <div className='px-20'>
      <h1 className='text-5xl text-center font-semibold mb-10'>My Posted Jobs</h1>
      {myJobs.map(job => (
        <SingleJobList key={job._id} job={job} />
      ))}
    </div>
    </>
  );
};

export default MyJobs;
