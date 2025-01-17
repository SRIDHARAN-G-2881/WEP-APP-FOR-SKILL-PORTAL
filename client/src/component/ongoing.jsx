/* eslint-disable no-undef */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';

export default function Ongoing() {
    const [skill,setskill]=useState('')

    const current = useSelector((state) => state.user.currentuser);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/getonuser', {
                    params: { name: current.username }
                });
                setskill(res.data[0].skill);
            } catch (err) {
                console.log(err);
            }
        };

        if (current && current.username) {
            fetchData();
        }
    }, [current]);
    useEffect(()=>{
        const data=async()=>{
            try{
            const res=await axios.get('http://localhost:3000/api/getonuserdata',{
                params:{skill:current.skill}
            });
            console.log(res);
          
        }
        catch(error){
            console.log(error);
        }
        
        };
        if (current && current.username) {
            data();
        }
    },[current]);

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center gap-3">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ongoing Skill</h2>
            <h2 className="text-xl font-bold text-blue-600 bg-blue-100 p-3 rounded-md inline-block">
                Your ongoing skill in this semester is: <div className='text-red-600'>{skill}</div>
            </h2>
            <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">YOUR SKILL HANDLING STAFF NAME IS:</h2>

            </div>
        </div>
    );
}