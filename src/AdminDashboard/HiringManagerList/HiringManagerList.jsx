import { useContext, useState } from "react";
import UseAxiosSecure from "../../Comonents/Hooks/UseAxiosSecure/UseAxiosSecure";
import UseAxiosPublic from "../../Comonents/Hooks/UseAxiosPublic/UseAxiosPublic";
import { AuthContext } from "../../Comonents/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const HiringManagerList = () => {
    const [page,setPage]= useState(0);
    const axiosSecure = UseAxiosSecure();
    const AxiosPublic = UseAxiosPublic();
    const {loading} = useContext(AuthContext);
    const { refetch, data: {result : HiringManagers = [], UsersCount = 0} = {} } = useQuery({
        queryKey: ['HiringManagers',page],
        enabled:!loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/hiring-talents/pagination?page=${page}`);
            console.log(res.data)
            return res.data;

        }

    })
    
    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/hiring-talents/admin/${user._id}`)
        .then(res=>{
           console.log(res.data);
           if(res.data.modifiedCount > 0){
               refetch();
               Swal.fire({
                   position: "top-end",
                   icon: "success",
                   title: `${user.name} is Admin Now`,
                   showConfirmButton: false,
                   timer: 1500
                 });
           }
        })
       }

       const handleRemoveAdmin = user => {
        axiosSecure.patch(`/hiring-talents/remove-admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is no longer an Admin`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };
    const totalPages = Math.ceil(UsersCount / 5);
    const pagesToShow = 5; 
    const pages = Array.from({ length: totalPages }, (_, i) => i);

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    const handleDelete = (user) =>{
        
        Swal.fire({
            title: `Are you sure to delete ${user?.name}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, delete ${user?.name}`
          }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await AxiosPublic.delete(`/hiring-talents/HR/${user._id}`);
                console.log(res.data);
            if(res.data.deletedCount){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Delete SuccessFully User ${user?.name}`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            }
          });
    }
    return (
        <div>
           <div>
            <div className="flex justify-evenly my-6 mb-10">
                <h2 className="text-4xl font-bold">All <span className='text-[#FF3811]'>Hiring Manager List</span></h2>
               
            </div>
            <div className="overflow-x-auto ml-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-xl text-orange-600'>Image</th>
                            <th className='text-xl text-orange-600'>Name</th>
                            <th className='text-xl text-orange-600'>Email</th>
                            <th className='text-xl text-orange-600'>Role</th>
                            <th className='text-xl text-orange-600'>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            HiringManagers.map((user,index) => <tr key={user._id}  className={index % 2 === 0 ? 'bg-[#F2F2F2]' : 'bg-orange-100'}>
                                
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                   <button> <h1 className='font-bold'>{user.name}</h1></button>
                                    <br />
                                    
                                </td>
                                <td className='font-bold'>{user.email}</td>
                                <th>
                                   {
                                    user.role2 === 'admin' ? <button onClick={() => handleRemoveAdmin(user)} className='btn bg-orange-600 btn-xs text-white font-bold'> Remove Admin</button> : 
                                    <button 
                                    onClick={()=> handleMakeAdmin(user) }
                                    className="btn btn-ghost btn-xs font-bold">Make Admin</button>
                                   }
                                </th>
                                
                                <td>
                              
                                    <button onClick={()=>handleDelete(user)} className='btn btn-xs bg-red-600 text-xs text-white font-bold'>Remove</button></td>
                            </tr>)
                        }
                        
                    </tbody>
                    {/* foot */}
                 
                </table>
            </div>
            <div className="text-center  mt-10 mb-10">
                <Button colorScheme='orange' variant="outline" onClick={handlePreviousPage} isDisabled={page === 0} className="btn mr-1 btn-sm bg-orange-600 text-white">{<ArrowLeftIcon />}</Button>
                {pages.map((pageNumber, index) => {
                    if (index === 0 || index === totalPages - 1 || (index >= page - Math.floor(pagesToShow / 2) && index <= page + Math.floor(pagesToShow / 2))) {
                        return (
                            <Button fontWeight='bold'  isDisabled={page === pageNumber} key={index} onClick={() => setPage(pageNumber)} className={`btn btn-sm mr-1 border ${page === pageNumber ? "bg-slate-300 text-black" : "bg-orange-600 text-white"}`}>{pageNumber + 1}</Button>
                        );
                    } else if (index === 1 && page > Math.floor(pagesToShow / 2) + 1) {
                        return <span className='mr-1' key={index}>..........</span>;
                    } else if (index === totalPages - 2 && page < totalPages - Math.floor(pagesToShow / 2) - 2) {
                        return <span className='mr-1' key={index}>..........</span>;
                    }
                    return null;
                })}
                <Button colorScheme='orange' variant="outline" onClick={handleNextPage} isDisabled={page === totalPages - 1} className="btn ml-1 btn-sm bg-orange-600 text-white">{<ArrowRightIcon />}</Button>
            </div>
        </div>
        </div>
    );
};

export default HiringManagerList;