'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from "@components/Profile";

const MyProfile = () => {
    const {data:session} = useSession();

    const [prompts, setPrompts] = useState([]);

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

    useEffect(() => {
    const fetchPrompts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/prompts`);
        const data = await response.json();

      setPrompts(data);
    }
    if (session?.user.id) fetchPrompts();
  }, [])

  return (
    <div>
      <Profile
        name="My" 
        desc='Welcome to my profile'
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    </div>
  )
}

export default MyProfile
